import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/user-models';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faSignOut = faSignOut;
  faBars = faBars;

  username: string | undefined;
  role: Roles | undefined;
  constructor(
    private sidebarService: NbSidebarService,
    private auth: AuthenticationService,
    private router: Router
  ) {}
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit() {
    const temp = this.auth.getUserInfo();
    this.username = temp?.username;
    this.role = temp?.role;
  }
  logOut() {
    this.auth.SignOut().subscribe({
      next: () => this.router.navigate(['/homepage'])
    });
  }
}
