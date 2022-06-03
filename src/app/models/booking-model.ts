import { Patient } from './user-models';
export enum Status {
  CONFIRMED = 'CONFIRMED',
  TENTATIVE = 'TENTATIVE',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}
export enum AttendType {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
}
export interface Attendee {
  attendeeType: AttendType;
  entity: Patient;
  entityNo: number;
}
export interface Booking {
  attendees: Attendee[];
  description: string;
  endTime: string;
  id: number;
  startTime: string;
  status: Status;
  statusComment?: string;
  title: string;
}

export interface BookingRequest {
  attendees: Attendee[];
  description?: string;
  endDate: string;
  id?: number;
  organiser: number; //check spelling
  startDate: string;
  title?: string;
}
export interface BookingResponse {
  bookingMap: Record<string, Booking[]>;
  endDate: string;
  startDate: string;
}

export interface BookingStatusUpdateRequest {
  bookingStatus: Status;
  comment: string;
  includeDependent: boolean;
}
export type Consultation = Booking & { practiceName?: string };
