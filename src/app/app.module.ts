import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarService,
  NbButtonModule,
  NbToastrModule,
  NbCardModule,
  NbInputModule,
  NbDatepickerModule,
  NbTimepickerModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ShellModule } from './shell/shell.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthModule } from './auth/auth.module';
import { API_TOKEN } from './shared/tokens';
import { HttpClientModule } from '@angular/common/http';
import {
  HomepageComponent,
  BookingComponent,
  ConsultationRequestsComponent,
  DashboardComponent,
  HealthRecordsComponent,
  PatientsComponent,
  SearchComponent,
  UpcomingConsultationsComponent,
  SearchCardComponent,
  MapComponent,
} from './pages';
import {
  CustomDatePipe,
  CustomTimePipe,
  NamePipe,
  GenerateInitialsPipe,
  GenerateFullNamePipe,
} from './shared/pipes';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BookingCardComponent,
  UpcomingConsultationsCardComponent,
} from './shared/components';

// state management
import { StoreModuleState } from './store/store.module';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    CustomDatePipe,
    CustomTimePipe,
    NamePipe,
    SearchComponent,
    SearchCardComponent,
    GenerateInitialsPipe,
    BookingComponent,
    GenerateFullNamePipe,
    UpcomingConsultationsCardComponent,
    UpcomingConsultationsComponent,
    MapComponent,
    HealthRecordsComponent,
    ConsultationRequestsComponent,
    PatientsComponent,
    BookingCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    ShellModule,
    FontAwesomeModule,
    NbButtonModule,
    NbCardModule,
    AuthModule,
    NbToastrModule.forRoot(),
    HttpClientModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    ReactiveFormsModule,
    NbUserModule,
    StoreModuleState,
  ],
  providers: [
    NbSidebarService,
    {
      provide: API_TOKEN,
      useValue: environment.baseUrl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
