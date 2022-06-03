import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BookingService } from 'src/app/services';
import { DoctorService } from 'src/app/services/doctor.service';

import * as BookingActions from '../actions/booking.actions';
@Injectable({ providedIn: 'root' })
export class BookingPageEffects {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService,
    private bookingService: BookingService
  ) {}
  getDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.getDoctor),
      mergeMap(({ id }) => {
        return this.doctorService.getDoctorByEntity(id).pipe(
          map((doctor) => BookingActions.getDoctorSuccess({ doctor })),
          catchError(() => of(BookingActions.getDoctorFailure()))
        );
      })
    );
  });
  createBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingActions.createBooking),
      mergeMap(({ body }) => {
        return this.bookingService.createBooking(body).pipe(
          map(() => BookingActions.createBookingSuccess()),
          catchError(() => of(BookingActions.createBookingFailure()))
        );
      })
    );
  });
}
