import { NgModule, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { UserService } from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class UiComponent implements DoCheck {
    public identity;

    constructor(
      private _userService: UserService
    ){

    }
    ngDoCheck(){
        this.identity = this._userService.getIdentity();
        console.log('identity');
    }
}
