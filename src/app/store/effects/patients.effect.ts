import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Status } from 'src/app/models';
import { BookingService, PatientService } from 'src/app/services';

import * as PatientsActions from '../actions/patients.actions';
@Injectable({ providedIn: 'root' })
export class PatientsPageEffects {
  constructor(
    private actions$: Actions,
    private patientsService: PatientService,
    private bookingService: BookingService
  ) {}
  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.loadPatients),
      mergeMap(() => {
        return this.patientsService.getPatients().pipe(
          map((patients) => PatientsActions.loadPatientsSuccess({ patients })),
          catchError(() => of(PatientsActions.loadPatientsFailure()))
        );
      })
    );
  });
  loadSearchedPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.loadSearchedPatients),
      mergeMap(({ firstName, lastName }) => {
        return this.patientsService.searchPatientByName(firstName, lastName).pipe(
          map((patients) => PatientsActions.loadPatientsSuccess({ patients })),
          catchError(() => of(PatientsActions.loadPatientsFailure()))
        );
      })
    );
  });
  createBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientsActions.createBooking),
      mergeMap(({ body }) => {
        console.log(body);
        return this.bookingService.createBooking(body).pipe(
          switchMap((booking) =>
            this.bookingService.updateBooking(booking.id, Status.CONFIRMED)
          ),
          map(() => PatientsActions.createBookingSuccess()),
          catchError(() => of(PatientsActions.createBookingFailure()))
        );
      })
    );
  });
}
