import { BookingState, initialBookingState } from './booking.state';
import {
  initialUpcomingConsultationsState,
  UpcomingConsultationsState,
} from './upcoming-consultations.state';
import { HealthState, initialHealthState } from './health.state';
import { initialPatientsState, PatientsState } from './patients.state';
import { initialSearchState, SearchState } from './search.state';
import {
  ConsultationRequestsState,
  initialConsultationRequestsState,
} from './consultation-requests.state';

export interface AppState {
  healthPage: HealthState;
  upcomingConsultationsPage: UpcomingConsultationsState;
  patientsPage: PatientsState;
  searchPage: SearchState;
  bookingPage: BookingState;
  consultationRequestsPage: ConsultationRequestsState;
}

export const initialAppState: AppState = {
  healthPage: initialHealthState,
  upcomingConsultationsPage: initialUpcomingConsultationsState,
  patientsPage: initialPatientsState,
  searchPage: initialSearchState,
  bookingPage: initialBookingState,
  consultationRequestsPage: initialConsultationRequestsState,
};
