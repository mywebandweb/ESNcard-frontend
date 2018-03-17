import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import _ from "lodash";

import { GLOBAL } from '../../services/global';
import { MemberService } from '../../services/member.service';
import { SaleService } from '../../services/sale.service';
import { EventService } from '../../services/event.service';
import { Member } from '../../models/member';
import { Sale } from '../../models/sale';
import { Event } from '../../models/event';



@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MemberService, SaleService, EventService]
})
export class DashboardComponent implements OnInit{
  public member: Member;
  public members: Member[];
  public sales: Sale[];
  public events: Event[];
  public url: string;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _memberService: MemberService,
    private _saleService: SaleService,
    private _eventService: EventService
  ){
    this.url = GLOBAL.url;
    this.token = GLOBAL.getToken();
  }

  ngOnInit(){
    console.log('Dashboard componente cargado !!');
    this.getMembers();
    this.getSales();
    this.getEvents();
    this.getTotal();
  }

  swalSubmitMember(id){

      swal({
        title: 'Estás seguro?',
        text: "¡No podrás volver atrás!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'No, cancela!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swal(
            'Eliminado!',
            'El socio ha sido eliminado.',
            'success'
          )
          this.deleteMember(id);

        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swal(
            'Cancelado',
            'El socio no ha sido eliminado :)',
            'error'
          )
        }
      })
  }

  swalSubmitSale(id){

      swal({
        title: 'Estás seguro?',
        text: "¡No podrás volver atrás!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'No, cancela!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swal(
            'Eliminado!',
            'La venta ha sido eliminada.',
            'success'
          )
          this.deleteSale(id);


        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swal(
            'Cancelado',
            'La venta no ha sido eliminada :)',
            'error'
          )

        }
      })
  }

  getMembers(){
    this._memberService.getMembers().subscribe(
      response => {
        if(!response.members){

        }else{
          this.members = response.members;
        }
      },
      error => {
        console.log(<any>error)
      }
    );

  }

  deleteMember(id){
    // $('#myModal-'+id).modal('hide');
    this._memberService.deleteMember(this.token, id).subscribe(
      response => {
        if(!response.member){
          alert('Error en el servidor');
          this._router.navigate(['/']);
        }
        this.getMembers();
      },
      error => {
        alert('Error en el servidor');
        this._router.navigate(['/']);
      }
    )
  }

  deleteSale(id){
    // $('#myModal-'+id).modal('hide');
    this._saleService.deleteSale(this.token, id).subscribe(
      response => {
        if(!response.sale){
          alert('Error en el servidor');
        }
        this.getSales();
      },
      error => {
        alert('Error en el servidor');
      }
    )
  }


  getSales(){
    this._saleService.getSales().subscribe(
      response => {
        if(!response.sales){

        }else{
          this.sales = response.sales;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  getEvents(){
    this._eventService.getEvents().subscribe(
      response => {
        if(!response.events){

        }else{
          this.events = response.events;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  getTotal(){
      let i = 0;
      let total = 10;
      let sale = this.sales[i];
      for (sale of this.sales){
          sale = this.sales[i];
          total = total + sale.total_amount;
          i++;
      }
  }



}
