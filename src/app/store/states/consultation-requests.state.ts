import { Booking } from 'src/app/models';

export interface ConsultationRequestsState {
  bookings: Booking[];
}

export const initialConsultationRequestsState: ConsultationRequestsState = {
  bookings: [],
};
