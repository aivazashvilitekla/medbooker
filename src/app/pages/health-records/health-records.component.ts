import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AttendType, Booking, Consultation, Roles } from 'src/app/models';
import { AuthenticationService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import * as HealthActions from 'src/app/store/actions/health.actions';
import {
  selectedPastBooking,
  selectPastBookings,
} from 'src/app/store/selectors/health.selectors';
@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
})
export class HealthRecordsComponent implements OnInit, OnDestroy {
  role: Roles | undefined;
  roles = Roles;
  bookings$: Observable<Booking[]> | undefined;
  noBookings: boolean | undefined;
  selectedBooking$: Observable<Booking | undefined> | undefined;
  practiceName: string | undefined;
  attendeeType = AttendType;
  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>
  ) {
    this.role = authService.getUserInfo().role;
  }
  ngOnDestroy(): void {
    this.store.dispatch(HealthActions.clearSelectedPastBooking());
  }
  ngOnInit() {
    this.retrieveBookings();
    this.bookings$ = this.store
      .select(selectPastBookings)
      .pipe(
        tap((res) =>
          res.length <= 0 ? (this.noBookings = true) : (this.noBookings = false)
        )
      );
    this.selectedBooking$ = this.store.select(selectedPastBooking);
  }
  selectBooking(booking: Consultation) {
    this.store.dispatch(HealthActions.SelectPastBooking({ booking }));
  }
  retrieveBookings() {
    if (this.role === Roles.Patient) {
      const { role, entityNo } = this.authService.getUserInfo();
      this.store.dispatch(
        HealthActions.loadPastBookings({ entityNo: entityNo })
      );
    }
  }
}
