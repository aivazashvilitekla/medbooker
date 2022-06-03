import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const selectSearchPageState = (state: AppState) => state.searchPage;

export const selectSearchedDoctors = createSelector(
  selectSearchPageState,
  (state) => state.doctors
);
export const selectMarkersCount = createSelector(
  selectSearchPageState,
  (state) => state.markersCount
);