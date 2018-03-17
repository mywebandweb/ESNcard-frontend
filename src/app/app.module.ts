// Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { MDBBootstrapModule } from 'angular-bootstrap-md';


//Importar Módulo Admin - Panel de Administración
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
// import { DemoMaterialModule, MaterialAngularModule } from './material-angular.module'

import { AppComponent } from './app.component';
import { UiComponent } from './ui/ui.component';
// Components
import { NouSociComponent } from './components/nou-soci/nou-soci.component';
import { VentaComponent } from './components/venta/venta.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Components UI Components
import { FooterComponent } from './ui/components/footer/footer.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { SidebarComponent } from './ui/components/sidebar/sidebar.component';


// Servicios
import { UserService } from './services/user.service';

// Pipes
import { SearchESNcardPipe } from './pipes/search.pipe';
import { SearchNamePipe } from './pipes/searchName.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
//Directives
import { ActiveInputDirective } from './directives/active-input.directive';
import { ActiveDirective } from './directives/active.class';

import { MatInputModule, MatNativeDateModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
@NgModule({
  exports: [
      MatDatepickerModule,
      MatInputModule,
      MatNativeDateModule,
      MatSelectModule,
      MatCheckboxModule,
      BrowserAnimationsModule
  ]
})
export class DemoMaterialModule {}



@NgModule({
  declarations: [
    AppComponent,
    NouSociComponent,
    VentaComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    MemberEditComponent,
    MemberDetailComponent,
    DashboardProductComponent,
    NewEventComponent,
    DashboardComponent,
    SearchESNcardPipe,
    SearchNamePipe,
    ReversePipe,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ActiveInputDirective,
    ActiveDirective
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AdminModule,
    AngularFontAwesomeModule,
    DemoMaterialModule
    // DemoMaterialModule,
    // MaterialAngularModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    appRoutingProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
