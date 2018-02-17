import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { Event } from '../../models/event';

@Component({
  selector: 'dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css'],
  providers: [EventService, UserService]
})
export class DashboardProductComponent {
  public title: string;
  public events: Event[];
  public event: Event;
  public token;
  public busqueda;
  public event_id;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventService: EventService,
    private _userService: UserService
  ){
    this.title = 'Dashboard';
    this.token = this._userService.getToken();
    this.event = new Event('','','','', null , null, null, null, '');
    this.event_id = this.event._id;
  }

  ngOnInit(){
    this.getEvents();
  }

  getEvents(){
    this._eventService.getEvents().subscribe(
      response => {
        if(!response.events){

        }else{
          
          // Función que recorre el comptador del evento
          response.events.forEach( function(event){
            event.counter = 0;
          });

          this.events = response.events;
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  deleteEvent(id){
    $('#myModal-'+id).modal('hide');
    this._eventService.deleteEvent(this.token, id).subscribe(
      response => {
        if(!response.event){
          alert('Error en el servidor');
        }
        this.getEvents();
      },
      error => {
        alert('Error en el servidor');
      }
    )
  }

  eventIncrement(event){
    event.counter++;
  }

  eventDecrement(event){
    (event.counter != 0) && event.counter--;
  }

}
