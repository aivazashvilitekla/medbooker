import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectPatientsState = (state: AppState) => state.patientsPage;

export const selectPatients = createSelector(
  selectPatientsState,
  (state) => state.patients
);
export const selectedPatient = createSelector(
  selectPatientsState,
  (state) => state.selectedPatient
);
// export const cancelBooking = createSelector(
//   selectUpcomingConsultationState,
//   (state) => state.selectedBooking
// );
