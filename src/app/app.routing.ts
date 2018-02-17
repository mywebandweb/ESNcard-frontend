// Módulos
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { NouSociComponent } from './components/nou-soci/nou-soci.component';
import { VentaComponent } from './components/venta/venta.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';
import { NewEventComponent } from './components/new-event/new-event.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'soci', pathMatch: 'full' },
  { path: 'soci', component: NouSociComponent },
  { path: 'venta', component: VentaComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mis-datos', component: UserEditComponent },
  { path: 'member/:id', component: MemberDetailComponent },
  { path: 'dashboard-product', component: DashboardProductComponent },
  { path: 'nuevo-evento', component: NewEventComponent }
]

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
