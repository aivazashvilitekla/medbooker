import { createAction, props } from '@ngrx/store';
import { BookingRequest, Patient } from 'src/app/models';

export const loadSearchedPatients = createAction(
  '[Load Doctors] Load Searched Patients',
  props<{
    firstName: string;
    lastName: string;
  }>()
);

export const loadPatients = createAction(
  '[Load Patients] Load Patients'
);
export const loadPatientsSuccess = createAction(
  '[Load Patients] Load Patients Success',
  props<{ patients: Patient[] }>()
);
export const loadPatientsFailure = createAction(
    '[Load Patients] Load Patients Failure'
);
  
export const selectPatient = createAction(
  '[Select patient] Select Patient',
  props<{ patient: Patient }>()
);
export const clearSelectedPatient = createAction(
  '[Clear patient] Clear selected Patient'
);


export const createBooking = createAction(
  '[Create Booking] Create Booking for Patient',
  props<{
    body: BookingRequest;
  }>()
);

export const createBookingSuccess = createAction(
  '[Create Booking] Create Booking for Patient Success'
);
export const createBookingFailure = createAction(
  '[Create Booking] Create Booking for Patient Failure'
);