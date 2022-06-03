import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Booking, Doctor } from 'src/app/models';
import { BookingService } from 'src/app/services';
import { DoctorService } from 'src/app/services/doctor.service';
import {
  flattenBookingResponse,
  setPracticeName,
} from 'src/app/shared/utils/helpers.fn';

import * as HealthActions from '../actions/health.actions';
@Injectable({ providedIn: 'root' })
export class HealthPageEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private doctorService: DoctorService
  ) {}
  loadPastBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HealthActions.loadPastBookings),
      mergeMap((action) => {
        const doctors$ = this.doctorService.getDoctors();
        return this.bookingService
          .getBookings(action.entityNo, undefined, new Date().toISOString())
          .pipe(
            map((bookings) => flattenBookingResponse(bookings)),
            switchMap((bookings: Booking[]) => {
              return doctors$.pipe(
                map((doctors: Doctor[]) => setPracticeName(bookings, doctors))
              );
            }),
            map((d) => HealthActions.loadPastBookingsSuccess({ bookings: d })),
            catchError(() => of(HealthActions.loadPastBookingsFailure()))
          );
      })
    );
  });
}
