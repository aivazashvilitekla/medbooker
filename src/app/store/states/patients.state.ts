import { Patient } from 'src/app/models';

export interface PatientsState {
  patients: Patient[];
  selectedPatient: Patient | undefined;
}

export const initialPatientsState: PatientsState = {
  patients: [],
  selectedPatient: undefined,
};
