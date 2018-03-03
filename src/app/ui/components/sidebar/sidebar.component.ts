import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard-product', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'soci', title: 'Nuevo Socio',  icon:'person', class: '' },
    { path: 'nuevo-evento', title: 'Nuevo Evento',  icon:'content_paste', class: '' },
    { path: 'nueva-venta', title: 'Nueva Venta',  icon:'shopping_cart', class: '' }
    //{ path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
