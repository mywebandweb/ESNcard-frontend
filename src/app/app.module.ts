// Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders} from './app.routing';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


//Importar Módulo Admin - Panel de Administración
import { AdminModule } from './admin/admin.module';

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

// Servicios
import { UserService } from './services/user.service';

// Pipes
import { SearchESNcardPipe } from './pipes/search.pipe';

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
    SearchESNcardPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AdminModule,
    AngularFontAwesomeModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
