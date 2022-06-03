import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
// import { catchError, map, mergeMap, of } from 'rxjs';
// import { PatientService } from 'src/app/services';

import * as SearchActions from '../actions/search.actions';
@Injectable({ providedIn: 'root' })
export class SearchPageEffects {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}
  loadSearchDoctors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadSearchDoctors),
      mergeMap(({ firstName, lastName }) => {
        return this.doctorService.searchDoctorByName(firstName, lastName).pipe(
          map((doctors) => SearchActions.loadSearchSuccess({ doctors })),
          catchError(() => of(SearchActions.loadDoctorsFailure()))
        );
      })
    );
  });
  loadDoctors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadDoctors),
      mergeMap(() => {
        return this.doctorService.getDoctors().pipe(
          map((doctors) => SearchActions.loadSearchSuccess({ doctors })),
          catchError(() => of(SearchActions.loadDoctorsFailure()))
        );
      })
    );
  });
}
