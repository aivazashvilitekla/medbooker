/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HealthRecordsComponent } from './health-records.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AttendType, Booking, Roles, Status } from 'src/app/models';
import { AuthenticationService } from 'src/app/services';

describe('HealthRecordsComponent', () => {
  let component: HealthRecordsComponent;
  let fixture: ComponentFixture<HealthRecordsComponent>;
  let authService = jasmine.createSpyObj<AuthenticationService>(['getUserInfo']);
  authService.getUserInfo.and.returnValue(
    { username: 'test', role: Roles.Patient, entityNo: 12121212, }
  )
  let bookings$: Observable<Booking[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, StoreModule.forRoot({})],
      declarations: [HealthRecordsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
        {
          provide: AuthenticationService, useValue: authService
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookings$ = of([
      {
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
        description: 'fdf',
        endTime: 'test',
        id: 1,
        startTime: 'test',
        status: Status.CONFIRMED,
        statusComment: 'test',
        title: 'test',
      },
      {
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
        description: 'test',
        endTime: 'test',
        id: 2,
        startTime: 'test',
        status: Status.CONFIRMED,
        statusComment: 'test',
        title: 'test',
      },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have bookings list', () => {
    fixture.componentInstance.bookings$ = bookings$;
    fixture.detectChanges();
    expect(fixture.componentInstance.bookings$).toEqual(bookings$);
  });
});
