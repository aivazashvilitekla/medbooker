/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { BookingComponent } from './booking.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Doctor } from 'src/app/models';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let toastrService = jasmine.createSpyObj(['']);
  let doctor$: Observable<Doctor>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [BookingComponent],
      schemas: [NO_ERRORS_SCHEMA],

      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
        {
          provide: NbToastrService,
          useValue: toastrService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    doctor$ = of({
      entityNo: 45454545,
      firstName: 'tekla',
      lastName: 'aivazashvili',
      practiceName: 'bla',
      practiceNo: '3',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have doctor object', () => {
    fixture.componentInstance.d$ = doctor$;
    fixture.detectChanges();
    expect(fixture.componentInstance.d$).toEqual(doctor$);
  });
});
