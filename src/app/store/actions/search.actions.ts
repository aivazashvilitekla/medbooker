import { createAction, props } from '@ngrx/store';
import { Doctor } from 'src/app/models';

export const loadSearchDoctors = createAction(
  '[Load Doctors] Load Searched Doctors',
  props<{
    firstName: string;
    lastName: string;
  }>()
);
export const loadDoctors = createAction(
  '[Load Doctors] Load Doctors'
);
export const loadSearchSuccess = createAction(
  '[Load Doctors] Load Doctors Success',
  props<{ doctors: Doctor[] }>()
);
export const loadDoctorsFailure = createAction(
  '[Load Doctors] Load Doctors Failure'
);
export const clearState = createAction(
  '[Load Doctors] Clear state'
);
