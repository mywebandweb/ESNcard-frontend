import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DashboardProductComponent } from '../components/dashboard-product/dashboard-product.component';

// Guards
import { AdminGuard } from '../services/admin.guard';

const adminRoutes: Routes = [
  {
      path: 'admin-panel',
      component: MainComponent,
      canActivate: [AdminGuard],
      children: [
        { path: '', redirectTo: 'listado', pathMatch: 'full' },
        { path: 'list', component: ListComponent },
        { path: 'crear', component: AddComponent },
        { path: 'dashboard-product', component: DashboardProductComponent },
        { path: 'editar/:id', component: EditComponent }
      ]
  }

];

@NgModule ({
    imports: [
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule
    ]
})

export class AdminRoutingModule {  }
