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

import { AppComponent } from './app.component';
// Components
import { NouSociComponent } from './components/nou-soci/nou-soci.component';
import { VentaComponent } from './components/venta/venta.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { NewEventComponent } from './components/new-event/new-event.component';
// Components UI Components
import { FooterComponent } from './ui/components/footer/footer.component';
import { NavbarComponent } from './ui/components/navbar/navbar.component';
import { SidebarComponent } from './ui/components/sidebar/sidebar.component';


// Servicios
import { UserService } from './services/user.service';

// Pipes
import { SearchESNcardPipe } from './pipes/search.pipe';
//Directives
import { ActiveInputDirective } from './directives/active-input.directive';
import { ActiveDirective } from './directives/active.class';



@NgModule({
  declarations: [
    AppComponent,
    NouSociComponent,
    VentaComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    MemberDetailComponent,
    DashboardProductComponent,
    NewEventComponent,
    SearchESNcardPipe,
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
    AngularFontAwesomeModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
