import { Inject, Injectable } from '@angular/core';
import { API_TOKEN } from '../shared/tokens';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Booking,
  BookingRequest,
  BookingResponse,
  BookingStatusUpdateRequest,
  Status,
} from '../models/booking-model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    @Inject(API_TOKEN) private baseUrl: string,
    private httpClient: HttpClient
  ) {}
  url = `${this.baseUrl}/booking`;

  createBooking(body: BookingRequest): Observable<Booking> {
    return this.httpClient.post<Booking>(`${this.url}/`, body);
  }
  // /api/v1/booking/attendee/{entityNo}
  getBookings(
    entityNo: number,
    fromDate?: string,
    toDate?: string
  ): Observable<BookingResponse> {
    let params = new HttpParams();
    if (fromDate) {
      params = params.append('fromDate', fromDate);
    }
    if (toDate) {
      params = params.append('toDate', toDate);
    }
    return this.httpClient.get<BookingResponse>(
      `${this.url}/attendee/${entityNo}`,
      { params }
    );
  }
  updateBooking(bookingId: number, status: Status): Observable<Booking> {
    const body: BookingStatusUpdateRequest = {
      bookingStatus: status,
      comment: 'Booking Status Update Comment',
      includeDependent: false,
    };
    return this.httpClient.put<Booking>(
      `${this.url}/${bookingId}/status`,
      body
    );
  }
  getBookingById(bookingId: number): Observable<Booking> {
    return this.httpClient.get<Booking>(`${this.url}/${bookingId}`);
  }
}
