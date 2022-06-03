/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchCardComponent } from './search-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('SearchCardComponent', () => {
  let component: SearchCardComponent;
  let fixture: ComponentFixture<SearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [SearchCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
