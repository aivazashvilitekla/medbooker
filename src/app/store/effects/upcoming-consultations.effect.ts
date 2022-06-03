import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Booking, Doctor, Roles, Status } from 'src/app/models';
import { BookingService } from 'src/app/services';
import { DoctorService } from 'src/app/services/doctor.service';
import { setPracticeName } from 'src/app/shared/utils/helpers.fn';
import * as UpcomingConsultationsActions from '../actions/upcoming-consultations.actions';

@Injectable({ providedIn: 'root' })
export class UpcomingConsultationsEffects {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService,
    private bookingService: BookingService
  ) {}
  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingConsultationsActions.loadBookings),

      mergeMap((action) => {
        const doctors$ = this.doctorService.getDoctors();
        return this.bookingService
          .getBookings(action.entityNo, new Date().toISOString())
          .pipe(
            map((bookings) =>
              Object.values(bookings.bookingMap)
                .flat()
                .filter((item) => {
                  if (action.role === Roles.Doctor) {
                    if (item.status === Status.CONFIRMED) return item;
                    return item;
                  } else {
                    return item;
                  }
                })
            ),
            switchMap((bookings: Booking[]) => {
              if (action.role == Roles.Patient) {
                return doctors$.pipe(
                  map((doctors: Doctor[]) => setPracticeName(bookings, doctors))
                );
              }
              return of(bookings);
            }),
            map((d) => {
              return UpcomingConsultationsActions.loadBookingsSuccess({
                bookings: d,
              });
            }),
            catchError(() =>
              of(UpcomingConsultationsActions.loadBookingsFailure())
            )
          );
      })
    );
  });
  cancelBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpcomingConsultationsActions.cancelBooking),
      mergeMap((action) => {
        return this.bookingService
          .updateBooking(action.id, action.status)
          .pipe(
            map(() =>
              UpcomingConsultationsActions.loadBookings({entityNo: action.entityNo, role: action.entityNo})
            )
          );
      })
    );
  });
}
