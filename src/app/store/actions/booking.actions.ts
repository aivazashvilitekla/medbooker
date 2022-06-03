import { createAction, props } from '@ngrx/store';
import { BookingRequest, Doctor } from 'src/app/models';

export const getDoctor = createAction(
  '[Get Doctor] Get Doctor',
  props<{
    id: number;
  }>()
);
export const getDoctorSuccess = createAction(
  '[Get Doctor] Get Doctor Success',
  props<{
    doctor: Doctor;
  }>()
);

export const getDoctorFailure = createAction('[Get Doctor] Get Doctor Failure');
export const createBooking = createAction(
  '[Create Booking] Create Booking',
  props<{
    body: BookingRequest;
  }>()
);

export const createBookingSuccess = createAction(
  '[Create Booking] Create Booking Success'
);
export const createBookingFailure = createAction(
  '[Create Booking] Create Booking Failure'
);
