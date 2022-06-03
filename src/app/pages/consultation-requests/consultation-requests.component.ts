import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {
  Booking,
  BookingResponse,
  Doctor,
  Roles,
  Status,
} from 'src/app/models';
import { AuthenticationService, BookingService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import * as ConsultationRequestsActions from 'src/app/store/actions/consultation-requests.actions';
import { getRequests } from 'src/app/store/selectors/consultation-requests.selectors';
@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.scss'],
})
export class ConsultationRequestsComponent implements OnInit {
  bookings$: Observable<Booking[]> | undefined;
  status = Status;
  noBookings: boolean | undefined;
  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.retrieveBookings();
    this.bookings$ = this.store.select(getRequests);
  }
  retrieveBookings() {
    const entityNo = this.authService.getUserInfo().entityNo;
    this.store.dispatch(
      ConsultationRequestsActions.getConsultationRequests({ entityNo })
    );
  }
  acceptBooking(id: number) {
    const entityNo = this.authService.getUserInfo().entityNo;
    this.store.dispatch(
      ConsultationRequestsActions.acceptRequest({ id, entityNo })
    );
  }
  rejectBooking(id: number) {
    const entityNo = this.authService.getUserInfo().entityNo;
    this.store.dispatch(
      ConsultationRequestsActions.rejectRequest({ id, entityNo })
    );
  }
}
