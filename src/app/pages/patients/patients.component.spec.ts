/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PatientsComponent } from './patients.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NbToastrService } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Patient } from 'src/app/models';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let toastrService = jasmine.createSpyObj(['']);
  let patients$: Observable<Patient[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AppRoutingModule, StoreModule.forRoot({})],
      declarations: [PatientsComponent],
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
    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // patients$ = of([
    //   {
    //     entityNo: 45454545,
    //     firstName: 'tekla',
    //     lastName: 'aivazashvili'
    //   },
    //   {
    //     entityNo: 45454545,
    //     firstName: 'tekla',
    //     lastName: 'aivazashvili'
    //   },
    //   {
    //     entityNo: 45454545,
    //     firstName: 'tekla',
    //     lastName: 'aivazashvili'
    //   }
    // ])
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have patients list', () => {
    fixture.componentInstance.patients$ = patients$;
    fixture.detectChanges();
    expect(fixture.componentInstance.patients$).toEqual(patients$);
  });
});
