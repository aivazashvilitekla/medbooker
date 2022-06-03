/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services';
import { Roles } from 'src/app/models';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService = jasmine.createSpyObj<AuthenticationService>(['getUserInfo']);
  authService.getUserInfo.and.returnValue(
    { username: 'test', role: Roles.Patient, entityNo: 12121212, }
  )

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [SidebarComponent],
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
        {
          provide: AuthenticationService, useValue: authService
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
