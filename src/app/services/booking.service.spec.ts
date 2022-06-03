/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { API_TOKEN } from '../shared/tokens';
import { BookingService } from './booking.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AttendType, BookingRequest, Status } from '../models';
describe('Service: Booking', () => {
  let httpTestingController: HttpTestingController;
  let service: BookingService;
  let body: BookingRequest;
  beforeEach(() => {
    body = {
      attendees: [
        {
          attendeeType: AttendType.PATIENT,
          entity: {
            entityNo: 12121212,
            firstName: 'tekla',
            lastName: 'aivazashvili',
          },
          entityNo: 12121212,
        },
        {
          attendeeType: AttendType.PROVIDER,
          entity: {
            entityNo: 12121212,
            firstName: 'tekla',
            lastName: 'aivazashvili',
          },
          entityNo: 12121212,
        },
      ],
      endDate: new Date().toISOString(),
      organiser: 12121212,
      startDate: new Date().toISOString(),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_TOKEN,
          useValue: environment.baseUrl,
        },
        BookingService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([BookingService], (service: BookingService) => {
    expect(service).toBeTruthy();
  }));
  describe('createBooking', () => {
    it('should call post with correct URL', () => {
      service.createBooking(body).subscribe();
      const req = httpTestingController.expectOne(
        environment.baseUrl + '/booking/'
      );
      expect(req.request.method).toBe('POST');
      httpTestingController.verify();
    });
  });
  describe('updateBooking', () => {
    it('should call put with correct URL', () => {
      service.updateBooking(50, Status.CONFIRMED).subscribe();
      const req = httpTestingController.expectOne(
        environment.baseUrl + '/booking/50/status'
      );
      expect(req.request.method).toBe('PUT');
    });
  });
  describe('getBookingsForEntity', () => {
    it('should call get with correct URL', () => {
      service.getBookings(11000111).subscribe();
      const req = httpTestingController.expectOne(
        environment.baseUrl + '/booking/attendee/11000111'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
