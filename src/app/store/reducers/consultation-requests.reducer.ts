import { createReducer, on } from '@ngrx/store';
import { initialBookingState, BookingState } from '../states/booking.state';
import * as ConsultationRequestsActions from '../actions/consultation-requests.actions';
import {
  ConsultationRequestsState,
  initialConsultationRequestsState,
} from '../states/consultation-requests.state';

export const ConsultationRequestsPageReducer = createReducer(
  initialConsultationRequestsState,
  on(
    ConsultationRequestsActions.getConsultationRequestsSuccess,
    (state, action): ConsultationRequestsState => {
      return {
        ...state,
        bookings: action.bookings,
      };
    }
  ),
  on(
    ConsultationRequestsActions.getConsultationRequestsFailure,
    (state): ConsultationRequestsState => {
      return {
        ...state,
        bookings: [],
      };
    }
  )
);
