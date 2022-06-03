import { createReducer, on } from '@ngrx/store';
import { initialBookingState, BookingState } from '../states/booking.state';
import * as BookingActions from '../actions/booking.actions';

export const BookingPageReducer = createReducer(
  initialBookingState,
  on(BookingActions.getDoctorSuccess, (state, action): BookingState => {
    return {
      ...state,
      doctor: action.doctor,
    };
  }),
  on(BookingActions.getDoctorFailure, (state): BookingState => {
    return {
      ...state,
      doctor: undefined,
    };
  })
);
