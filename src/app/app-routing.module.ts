import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DoctorPermissionGuard, PatientPermissionGuard } from './guards';
import { BookingComponent } from './pages';
import { ConsultationRequestsComponent } from './pages';
import { DashboardComponent } from './pages';
import { HealthRecordsComponent } from './pages';
import { HomepageComponent } from './pages';
import { PatientsComponent } from './pages';
import { SearchComponent } from './pages';
import { UpcomingConsultationsComponent } from './pages';
import { WrapperComponent } from './shell';
import { AnonymousGuard } from './guards';

const routes: Routes = [
  {
    path: 'homepage',
    canActivate: [AnonymousGuard],
    component: HomepageComponent,
  },
  {
    path: '',
    component: WrapperComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'search',
        canActivate: [PatientPermissionGuard],
        component: SearchComponent,
      },
      {
        path: 'booking/:id',
        canActivate: [PatientPermissionGuard],
        component: BookingComponent,
      },
      {
        path: 'upcoming-consultations',
        component: UpcomingConsultationsComponent,
      },
      {
        path: 'health-records',
        canActivate: [PatientPermissionGuard],
        component: HealthRecordsComponent,
      },
      {
        path: 'consultation-requests',
        canActivate: [DoctorPermissionGuard],
        component: ConsultationRequestsComponent,
      },
      {
        path: 'patients',
        canActivate: [DoctorPermissionGuard],
        component: PatientsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
