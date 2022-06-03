import { Component, OnInit } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { Booking, Roles, Status } from 'src/app/models';
import { AuthenticationService } from 'src/app/services';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import * as ConsultationRequestsActions from 'src/app/store/actions/consultation-requests.actions';
import { getRequests } from 'src/app/store/selectors/consultation-requests.selectors';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  role: Roles | undefined;
  roles = Roles;
  status = Status;
  noBookings: boolean | undefined;
  bookings$: Observable<Booking[]> | undefined;
  constructor(
    authService: AuthenticationService,
    private store: Store<AppState>
  ) {
    this.role = authService.getUserInfo().role;
  }
  retrieveBookings() {
    if (this.role)
      this.store.dispatch(
        ConsultationRequestsActions.getConsultationRequests({
          entityNo: this.role,
        })
      );
  }
  ngOnInit() {
    this.retrieveBookings();
    this.bookings$ = this.store.select(getRequests).pipe(
      map((bookings) => bookings.slice(0, 5)),
      tap((res) =>
        res.length <= 0 ? (this.noBookings = true) : (this.noBookings = false)
      )
    );
  }
  acceptBooking(id: number) {
    if (this.role)
      this.store.dispatch(
        ConsultationRequestsActions.acceptRequest({ id, entityNo: this.role })
      );
  }
  rejectBooking(id: number) {
    if (this.role)
      this.store.dispatch(
        ConsultationRequestsActions.rejectRequest({ id, entityNo: this.role })
      );
  }
}
