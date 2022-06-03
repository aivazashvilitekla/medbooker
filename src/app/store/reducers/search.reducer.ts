import { createReducer, on } from '@ngrx/store';
import { initialSearchState, SearchState } from '../states/search.state';
import * as SearchActions from '../actions/search.actions';

export const searchPageReducer = createReducer(
  initialSearchState,
  on(SearchActions.loadSearchSuccess, (state, action): SearchState => {
    return {
      ...state,
      doctors: action.doctors ? action.doctors : [],
      markersCount: action.doctors.length
    };
  }),
  on(SearchActions.loadDoctorsFailure, (state, action): SearchState => {
    return {
      ...state,
      doctors: [],
    };
  }),
  on(SearchActions.loadDoctors, (state, action): SearchState => {
    return {
      ...state,
      doctors: [],
    };
  }),
  on(SearchActions.clearState, (state, action): SearchState => {
    return {
      ...state,
      doctors: [],
      markersCount: undefined
    };
  })
);
