import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import {
  HealthPageEffects,
  UpcomingConsultationsEffects,
  PatientsPageEffects,
  SearchPageEffects,
  BookingPageEffects,
  ConsultationRequestsPageEffects
} from './effects';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      HealthPageEffects,
      UpcomingConsultationsEffects,
      PatientsPageEffects,
      SearchPageEffects,
      BookingPageEffects,
      ConsultationRequestsPageEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Medbooker Application',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class StoreModuleState {}
