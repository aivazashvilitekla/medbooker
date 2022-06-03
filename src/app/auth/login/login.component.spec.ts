/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginComponent } from './login.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/services';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService = jasmine.createSpyObj(['']);
  let toastrService = jasmine.createSpyObj(['']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
        {
          provide: AuthenticationService,
          useValue: authService,
        },
        {
          provide: NbToastrService,
          useValue: toastrService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
