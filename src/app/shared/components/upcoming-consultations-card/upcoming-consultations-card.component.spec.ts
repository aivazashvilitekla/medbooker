/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { UpcomingConsultationsCardComponent } from './upcoming-consultations-card.component';
import { AttendType, Consultation, Status } from 'src/app/models';
import { CustomDatePipe, CustomTimePipe, NamePipe } from '../../pipes';

describe('UpcomingConsultationsCardComponent', () => {
  let component: UpcomingConsultationsCardComponent;
  let fixture: ComponentFixture<UpcomingConsultationsCardComponent>;
  let booking: Consultation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingConsultationsCardComponent, CustomDatePipe, CustomTimePipe, NamePipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingConsultationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    booking = {
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
      endTime: new Date().toISOString(),
      id: 1,
      startTime: new Date().toISOString(),
      status: Status.CONFIRMED,
      statusComment: 'test',
      title: 'test',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have booking object', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    expect(fixture.componentInstance.booking).toEqual(booking);
  });
});
