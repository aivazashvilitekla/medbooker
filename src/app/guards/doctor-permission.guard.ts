import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { Roles } from '../models/user-models';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class DoctorPermissionGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.currentUserState.pipe(
      map(() => {
        if (this.authService.getUserInfo().role === Roles.Doctor) {
          return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
      })
    );
  }
}
