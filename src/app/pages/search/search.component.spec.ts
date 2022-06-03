/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StateObservable, Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Observable, of } from 'rxjs';
import { Doctor } from 'src/app/models';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let doctors$: Observable<Doctor[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    doctors$ = of([
      {
        entityNo: 45454545,
        firstName: 'tekla',
        lastName: 'aivazashvili',
        practiceName: 'bla',
        practiceNo: '3'
      },
      {
        entityNo: 45454545,
        firstName: 'tekla',
        lastName: 'aivazashvili',
        practiceName: 'bla',
        practiceNo: '3'
      },
      {
        entityNo: 45454545,
        firstName: 'tekla',
        lastName: 'aivazashvili',
        practiceName: 'bla',
        practiceNo: '3'
      }
    ])
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have doctors list', () => {
    fixture.componentInstance.doctors$ = doctors$;
    fixture.detectChanges();
    expect(fixture.componentInstance.doctors$).toEqual(doctors$);
  });
});
