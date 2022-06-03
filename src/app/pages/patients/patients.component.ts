import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, tap } from 'rxjs';
import { AttendType, BookingRequest, Doctor, Patient } from 'src/app/models';
import { AuthenticationService, ToastrMessagesService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import * as PatientsActions from 'src/app/store/actions/patients.actions';
import {
  selectedPatient,
  selectPatients,
} from 'src/app/store/selectors/patients.selectors';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients$: Observable<Patient[]> | undefined;
  selectedItem$: Observable<Patient | undefined> | undefined;
  bookingForm: FormGroup | undefined;
  noPatients: boolean | undefined;
  searchForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private toastrService: ToastrMessagesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this._initSearchForm();
    this._initBookingForm();
    this.loadPatients();
    this.selectedItem$ = this.store.select(selectedPatient);
    this.patients$ = this.store
      .select(selectPatients)
      .pipe(
        tap((res) =>
          res.length <= 0 ? (this.noPatients = true) : (this.noPatients = false)
        )
      );
    this.listeningSearch();
  }
  listeningSearch() {
    if (this.searchForm)
      this.searchForm.valueChanges
        .pipe(debounceTime(700))
        .subscribe(({ firstName, lastName }) => {
          if (!firstName && !lastName) this.loadPatients();
          this.searchPatients(firstName, lastName);
        });
  }
  searchPatients(firstName: string, lastName: string) {
    this.store.dispatch(
      PatientsActions.loadSearchedPatients({ firstName, lastName })
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(PatientsActions.clearSelectedPatient());
  }
  loadPatients() {
    this.store.dispatch(PatientsActions.loadPatients());
  }
  generateDate() {
    if (this.bookingForm && this.bookingForm.valid) {
      const date = new Date(this.bookingForm.get('date')?.value);
      return date.toISOString();
    } else {
      this.toastrService.showErrorMessage('Please fill out required fields.');
      return;
    }
  }
  createAppointment(patient: Patient) {
    this.store.dispatch(PatientsActions.selectPatient({ patient }));
  }
  createBooking(patient: Patient) {
    const date = this.generateDate();
    if (date && this.selectedItem$) {
      const user: Doctor = JSON.parse(
        this.auth.currentUser?.displayName as string
      );
      const body: BookingRequest = {
        attendees: [
          {
            attendeeType: AttendType.PROVIDER,
            entity: {
              entityNo: user.entityNo,
              firstName: user.firstName,
              lastName: user.lastName,
            },
            entityNo: user.entityNo,
          },
          {
            attendeeType: AttendType.PATIENT,
            entity: {
              entityNo: patient.entityNo as number,
              firstName: patient.firstName as string,
              lastName: patient.lastName as string,
            },
            entityNo: patient.entityNo as number,
          },
        ],
        endDate: date,
        organiser: user.entityNo,
        startDate: date,
      };
      this.store.dispatch(PatientsActions.createBooking({ body }));
      this.store.dispatch(PatientsActions.clearSelectedPatient());
    }
  }
  get currentDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  private _initBookingForm() {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
    });
  }

  private _initSearchForm() {
    this.searchForm = this.fb.group({
      firstName: '',
      lastName: '',
    });
  }
}
