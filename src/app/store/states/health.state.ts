import { Booking } from 'src/app/models';

export interface HealthState {
  pastBookings: Booking[];
  selectedPastBooking: Booking | undefined;
}

export const initialHealthState: HealthState = {
  pastBookings: [],
  selectedPastBooking: undefined,
};
