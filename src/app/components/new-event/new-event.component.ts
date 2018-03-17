import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';

import { GLOBAL } from '../../services/global';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';

import { Event } from '../../models/event';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';



@Component({
  selector: 'new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['../../../assets/css/form-green.scss'],
  providers: [UserService, EventService]
})
export class NewEventComponent implements OnInit{
  public title: string;
  public event: Event;
  public identity;
  public token;
  public url: string;
  public status;
  public is_edit;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _eventService: EventService
  ){
    this.is_edit = true;
    this.title = 'Crear Evento';
    this.event = new Event();
    this.identity = this._userService.getIdentity();
    this.token = GLOBAL.getToken();
    this.url = GLOBAL.url;
  }



  ngOnInit(){
    console.log('new-event component ha sido cargado!!');
  }

  onSubmit(){
    console.log(this.event);
    // Añadir Evento en base de datos
    this._eventService.addEvent(this.token, this.event).subscribe(
      response => {
        if(!response.event){
          this.status = 'error;'
        }else{
          this.status = 'success';
          this.event = response.event;

          swal(
            'Creado!',
            'Has añadido un nuevo evento.',
            'success'
          )
        }
      },
      error => {
          var errorMessage = <any>error;

          if(errorMessage != null){
            this.status = 'error';
          }
      }
    );
  }

}
