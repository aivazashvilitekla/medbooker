import { createAction, props } from '@ngrx/store';
import { Booking, Consultation, Roles, Status } from 'src/app/models';

export const loadBookings = createAction(
  '[Load Bookings] Load Bookings',
  props<{ entityNo: number; role: Roles }>()
);
export const loadBookingsSuccess = createAction(
  '[Load Bookings] Load Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadBookingsFailure = createAction(
    '[Load Bookings] Load Bookings Failure'
);
export const cancelBooking = createAction(
  '[Cancel Bookings] Cancel Booking',
  props<{ id: number, status: Status, entityNo: number }>()
);
//   not api
export const selectBooking = createAction(
  '[Select booking] Select Booking',
  props<{ consultation: Consultation }>()
);
export const clearSelectedBooking = createAction(
  '[Clear booking] Clear selected Booking'
);
