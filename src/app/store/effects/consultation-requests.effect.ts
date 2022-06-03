import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Status } from 'src/app/models';
import { BookingService } from 'src/app/services';

import * as ConsultationRequestsActions from '../actions/consultation-requests.actions';
@Injectable({ providedIn: 'root' })
export class ConsultationRequestsPageEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService
  ) {}
  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsultationRequestsActions.getConsultationRequests),
      mergeMap((action) => {
        return this.bookingService
          .getBookings(action.entityNo, new Date().toISOString())
          .pipe(
            map((bookings) =>
              Object.values(bookings.bookingMap)
                .flat()
                .filter((item) => item.status === Status.TENTATIVE)
            ),
            map((bookings) =>
              ConsultationRequestsActions.getConsultationRequestsSuccess({
                bookings,
              })
            ),
            catchError(() =>
              of(ConsultationRequestsActions.getConsultationRequestsFailure())
            )
          );
      })
    );
  });
  acceptRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsultationRequestsActions.acceptRequest),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.id, Status.CONFIRMED)
          .pipe(
            map(() =>
              ConsultationRequestsActions.getConsultationRequests({
                entityNo: action.entityNo,
              })
            )
          );
      })
    );
  });
  rejectRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConsultationRequestsActions.rejectRequest),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.id, Status.DECLINED)
          .pipe(
            map(() =>
              ConsultationRequestsActions.getConsultationRequests({
                entityNo: action.entityNo,
              })
            )
          );
      })
    );
  });
}
