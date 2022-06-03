import { Booking, Consultation } from 'src/app/models';

export interface UpcomingConsultationsState {
  pastBookings: Booking[];
  selectedBooking: Consultation | undefined;
}
export const initialUpcomingConsultationsState: UpcomingConsultationsState = {
  pastBookings: [],
  selectedBooking: undefined,
};

