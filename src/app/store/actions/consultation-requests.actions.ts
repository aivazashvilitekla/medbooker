import { createAction, props } from '@ngrx/store';
import { Booking, BookingRequest } from 'src/app/models';

export const getConsultationRequests = createAction(
  '[Get Consultation Requests] Get Consultation Requests',
  props<{
    entityNo: number;
  }>()
);
export const getConsultationRequestsSuccess = createAction(
  '[Get Consultation Requests] Get Consultation Requests Success',
  props<{
    bookings: Booking[];
  }>()
);

export const getConsultationRequestsFailure = createAction(
  '[Get Consultation Requests] Get Consultation Requests Failure'
);

export const acceptRequest = createAction(
  '[Accept Consultation] Accept Consultation',
  props<{
      id: number;
      entityNo: number;
  }>()
);
export const rejectRequest = createAction(
    '[Reject Consultation] Reject Consultation',
    props<{
        id: number;
        entityNo: number;
    }>()
  );