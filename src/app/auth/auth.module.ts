import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NbLayoutModule, NbRadioModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from '../pages';
import { LoadingComponent } from '../shared/components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    AuthRoutingModule,
    NbLayoutModule,
    NbRadioModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, RegisterComponent, NotFoundComponent, LoadingComponent],
  exports: [],
})
export class AuthModule {}
