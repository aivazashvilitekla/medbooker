import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectUpcomingConsultationState = (state: AppState) =>
  state.upcomingConsultationsPage;

export const selectBookings = createSelector(
  selectUpcomingConsultationState,
  (state) => state.pastBookings
);
export const selectedBooking = createSelector(
  selectUpcomingConsultationState,
  (state) => state.selectedBooking
);
// export const cancelBooking = createSelector(
//   selectUpcomingConsultationState,
//   (state) => state.selectedBooking
// );