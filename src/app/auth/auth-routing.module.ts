import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from '../guards/anonymous.guard';
import { NotFoundComponent } from '../pages';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AnonymousGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [AnonymousGuard],
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);
