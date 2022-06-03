import { createReducer, on } from '@ngrx/store';
import {
    initialUpcomingConsultationsState,
  UpcomingConsultationsState,
} from '../states/upcoming-consultations.state';
import * as ConsultationRequestsActions from '../actions/upcoming-consultations.actions';

export const featureKey = 'upcomingConsultations';

export const upcomingConsultationsReducer = createReducer(
    initialUpcomingConsultationsState,
  on(
    ConsultationRequestsActions.loadBookingsSuccess,
    (state, action): UpcomingConsultationsState => {
      return {
        ...state,
        pastBookings: action.bookings,
      };
    }
  ),
  on(
    ConsultationRequestsActions.loadBookingsFailure,
    (state, action): UpcomingConsultationsState => {
      return {
        ...state,
        pastBookings: [],
      };
    }
  ),
  on(
    ConsultationRequestsActions.selectBooking,
    (state, action): UpcomingConsultationsState => {
      return {
        ...state,
        selectedBooking: action.consultation,
      };
    }
  ),
  on(
    ConsultationRequestsActions.clearSelectedBooking,
    (state, action): UpcomingConsultationsState => {
      return {
        ...state,
        selectedBooking: undefined,
      };
    }
  )
);
