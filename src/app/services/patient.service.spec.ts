/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { API_TOKEN } from '../shared/tokens';
import { PatientService } from './patient.service';

describe('Service: Patient', () => {
  let httpTestingController: HttpTestingController;
  let service: PatientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PatientService,
        {
          provide: API_TOKEN,
          useValue: environment.baseUrl,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(PatientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));
  describe('getPatientsByEntity', () => {
    it('should call get with correct URL', () => {
      service.getPatientByEntity(1000000001).subscribe();
      const req = httpTestingController.expectOne(
        environment.baseUrl + '/member/1000000001'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
