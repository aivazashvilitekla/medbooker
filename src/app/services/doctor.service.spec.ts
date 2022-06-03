/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { API_TOKEN } from '../shared/tokens';
import { DoctorService } from './doctor.service';

describe('Service: Doctor', () => {
  let httpTestingController: HttpTestingController;
  let service: DoctorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: API_TOKEN,
          useValue: environment.baseUrl,
        },
        DoctorService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(DoctorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([DoctorService], (service: DoctorService) => {
    expect(service).toBeTruthy();
  }));
  describe('getDoctors', () => {
    it('should call get with correct URL', () => {
      service.getDoctorByEntity(11000111).subscribe();
      const req = httpTestingController.expectOne(
        environment.baseUrl + '/practitioner/11000111'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
