/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NbToastrService } from '@nebular/theme';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService = jasmine.createSpyObj(['']);
  let toastrService = jasmine.createSpyObj(['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
        {
          provide: AuthenticationService, useValue: authService
        },
        {
          provide: NbToastrService, useValue: toastrService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should inject FormBuilder', inject(
    [FormBuilder],
    (formBuilder: FormBuilder) => {
      expect(formBuilder).toBeTruthy();
    }
  ));
});
