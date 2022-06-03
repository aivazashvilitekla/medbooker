import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {
  AttendType,
  Booking,
  Consultation,
  Roles,
  Status,
} from 'src/app/models';
import { AuthenticationService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import * as UpcomingConsultationsActions from 'src/app/store/actions/upcoming-consultations.actions';
import {
  selectBookings,
  selectedBooking,
} from 'src/app/store/selectors/upcoming-consultations.selectors';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
})
export class UpcomingConsultationsComponent implements OnInit {
  bookings$: Observable<Booking[]> | undefined;
  selectedBooking$: Observable<Consultation | undefined> | undefined;
  attendeeType = AttendType;
  status = Status;
  role: Roles | undefined;
  roles = Roles;
  noBookings: boolean | undefined;

  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.role = this.authService.getUserInfo().role;
    this.retrieveBookings();

    this.bookings$ = this.store
      .select(selectBookings)
      .pipe(
        tap((res) =>
          res.length <= 0 ? (this.noBookings = true) : (this.noBookings = false)
        )
      );
    this.selectedBooking$ = this.store.select(selectedBooking);
  }
  selectBooking(consultation: Consultation) {
    this.store.dispatch(
      UpcomingConsultationsActions.selectBooking({ consultation })
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(UpcomingConsultationsActions.clearSelectedBooking());
  }
  retrieveBookings() {
    if (this.role === Roles.Patient) {
      const { role, entityNo } = this.authService.getUserInfo();
      this.store.dispatch(
        UpcomingConsultationsActions.loadBookings({ entityNo: entityNo, role })
      );
    }
    if (this.role === Roles.Doctor) {
      const { role, entityNo } = this.authService.getUserInfo();
      this.store.dispatch(
        UpcomingConsultationsActions.loadBookings({ entityNo: entityNo, role })
      );
    }
  }
  cancelBooking(id: number, status: Status) {
    if (this.role)
      this.store.dispatch(
        UpcomingConsultationsActions.cancelBooking({
          id,
          status,
          entityNo: this.role,
        })
      );
    this.store.dispatch(UpcomingConsultationsActions.clearSelectedBooking());
  }
}
