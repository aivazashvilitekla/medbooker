import {
  Attendee,
  AttendType,
  Booking,
  BookingResponse,
  Consultation,
  Doctor,
  Roles,
  Status,
} from 'src/app/models';

export function findWithAttendType(
  bookings: Booking[],
  attendType?: AttendType
) {
  return bookings.map((booking: Booking) => {
    return {
      id: booking.id,
      status: booking.status,
      entityNo: booking.attendees.find(
        (attendee: Attendee) => attendee.attendeeType == attendType
      )?.entityNo,
      startTime: booking.startTime,
    };
  });
}

export function flattenBookingResponse(bookings: BookingResponse) {
  return Object.values(bookings.bookingMap).flat();
}
export function setPracticeName(bookings: Booking[], doctors: Doctor[]) {
  return bookings.map((b) => {
    const ProviderEntity = b.attendees.find(
      (a) => a.attendeeType === AttendType.PROVIDER
    )?.entityNo;
    const practiceName = doctors.find(
      (d) => d.entityNo == ProviderEntity
    )?.practiceName;
    return {
      ...b,
      practiceName,
    };
  });
}
