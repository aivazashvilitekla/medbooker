import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectConsultationRequestsPageState = (state: AppState) => state.consultationRequestsPage;

export const getRequests = createSelector(
    selectConsultationRequestsPageState,
  (state) => state.bookings
);
