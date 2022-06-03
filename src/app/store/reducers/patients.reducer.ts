import { createReducer, on } from '@ngrx/store';
import { initialPatientsState, PatientsState } from '../states/patients.state';
import * as PatientsActions from '../actions/patients.actions';


export const featureKey = 'patients';


export const patientsReducer = createReducer(
    initialPatientsState,
  on(
    PatientsActions.loadPatientsSuccess,
    (state, action): PatientsState => {
      return {
        ...state,
        patients: action.patients,
      };
    }
  ),
  on(
    PatientsActions.loadPatientsFailure,
    (state, action): PatientsState => {
      return {
        ...state,
        patients: [],
      };
    }
  ),
  on(
    PatientsActions.selectPatient,
    (state, action): PatientsState => {
      return {
        ...state,
        selectedPatient: action.patient,
      };
    }
  ),
  on(
    PatientsActions.clearSelectedPatient,
    (state, action): PatientsState => {
      return {
        ...state,
        selectedPatient: undefined,
      };
    }
  )
);
