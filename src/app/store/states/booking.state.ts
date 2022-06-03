import { Doctor } from 'src/app/models';

export interface BookingState {
  doctor: Doctor | undefined;
}

export const initialBookingState: BookingState = {
  doctor: undefined,
};
