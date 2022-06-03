import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faUserDoctor,
  faFileMedical,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'src/app/models/user-models';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faHome = faHome;
  faUserDoctor = faUserDoctor;
  faFileMedical = faFileMedical;
  faCalendarCheck = faCalendarCheck;

  role: Roles | undefined;
  roles = Roles;

  constructor(private authService: AuthenticationService) {
    this.role = authService.getUserInfo().role;
  }

  ngOnInit() {}
}
