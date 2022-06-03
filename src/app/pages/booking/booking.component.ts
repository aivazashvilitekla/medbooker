import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendType, BookingRequest, Doctor, Patient } from 'src/app/models';
import { DoctorService } from 'src/app/services/doctor.service';
import {
  AuthenticationService,
  BookingService,
  ToastrMessagesService,
} from 'src/app/services';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import * as BookingActions from 'src/app/store/actions/booking.actions';
import { getDoctor } from 'src/app/store/selectors/booking.selectors';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  doctor: Doctor | undefined;

  d$: Observable<Doctor | undefined> | undefined;
  bookingForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService,
    private auth: AuthenticationService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this._initBookingForm();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDoctor(id);
    this.d$ = this.store
      .select(getDoctor)
      .pipe(tap((res) => (this.doctor = res)));
  }
  getDoctor(id: number) {
    this.store.dispatch(BookingActions.getDoctor({ id }));
  }
  createBooking() {
    const date = this.generateDate();
    if (date && this.d$) {
      const user: Patient = JSON.parse(
        this.auth.currentUser?.displayName as string
      );
      const body: BookingRequest = {
        attendees: [
          {
            attendeeType: AttendType.PATIENT,
            entity: {
              entityNo: user.entityNo,
              firstName: user.firstName,
              lastName: user.lastName,
            },
            entityNo: user.entityNo,
          },
          {
            attendeeType: AttendType.PROVIDER,
            entity: {
              entityNo: this.doctor?.entityNo as number,
              firstName: this.doctor?.firstName as string,
              lastName: this.doctor?.lastName as string,
            },
            entityNo: this.doctor?.entityNo as number,
          },
        ],
        endDate: date,
        organiser: user.entityNo,
        startDate: date,
      };
      this.store.dispatch(BookingActions.createBooking({ body }));
      this.router.navigate(['/upcoming-consultations']);
    }
  }
  private _initBookingForm() {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
    });
  }
  generateDate() {
    if (this.bookingForm.valid) {
      const date = new Date(this.bookingForm.get('date')?.value);
      return date.toISOString();
    } else {
      this.toastrService.showErrorMessage('Please fill out required fields.');
      return;
    }
  }
  get currentDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }
}
