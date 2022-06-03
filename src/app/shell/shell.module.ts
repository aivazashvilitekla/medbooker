import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
} from '@nebular/theme';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './index';
import { SidebarComponent } from './index';
import { WrapperComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbSidebarModule,
    NbLayoutModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  exports: [WrapperComponent],
  declarations: [WrapperComponent, HeaderComponent, SidebarComponent],
})
export class ShellModule {}
