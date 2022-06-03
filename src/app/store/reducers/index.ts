import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { BookingPageReducer } from './booking.reducer';
import { ConsultationRequestsPageReducer } from './consultation-requests.reducer';
import { healthRecordReducer } from './health.reducer';
import { patientsReducer } from './patients.reducer';
import { searchPageReducer } from './search.reducer';
import { upcomingConsultationsReducer } from './upcoming-consultations.reducer';

export const reducers: ActionReducerMap<AppState> = {
  healthPage: healthRecordReducer,
  upcomingConsultationsPage: upcomingConsultationsReducer,
  patientsPage: patientsReducer,
  searchPage: searchPageReducer,
  bookingPage: BookingPageReducer,
  consultationRequestsPage: ConsultationRequestsPageReducer,
};
