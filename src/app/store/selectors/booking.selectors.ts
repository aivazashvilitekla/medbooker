import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectBookingPageState = (state: AppState) => state.bookingPage;

export const getDoctor = createSelector(
  selectBookingPageState,
  (state) => state.doctor
);
