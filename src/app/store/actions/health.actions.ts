//API Actions

import { createAction, props } from '@ngrx/store';
import { Booking } from 'src/app/models';

export const loadPastBookings = createAction(
  '[Load bookings] Load past Bookings',
  props<{ entityNo: number }>()
);

export const loadPastBookingsSuccess = createAction(
  '[Load bookings] Load past Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadPastBookingsFailure = createAction(
  '[Load bookings] Load past Bookings Failure'
);

// not api

export const SelectPastBooking = createAction(
  '[Select booking] Select past Booking',
  props<{ booking: Booking }>()
);
export const clearSelectedPastBooking = createAction(
  '[Clear booking] Clear selected Booking'
);
