/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BookingCardComponent } from './booking-card.component';
import { FormBuilder } from '@angular/forms';
import { Doctor, Patient } from 'src/app/models';

describe('BookingCardComponent', () => {
  let component: BookingCardComponent;
  let fixture: ComponentFixture<BookingCardComponent>;
  let item: Doctor | Patient | undefined;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCardComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have doctor or patient object', () => {
    fixture.componentInstance.item = item;
    fixture.detectChanges();
    expect(fixture.componentInstance.item).toEqual(item);
  });
});
