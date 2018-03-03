import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import _ from "lodash";

import { GLOBAL } from '../../services/global';
import { EventService } from '../../services/event.service';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { Event } from '../../models/event';
import { Sale } from '../../models/sale';

@Component({
  selector: 'dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css'],
  providers: [EventService, SaleService, UserService]
})
export class DashboardProductComponent {
  public title: string;
  public events: Event[];
  public event: Event;
  public status;
  public identity;
  public token;
  public busqueda;
  public sale = new Sale();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventService: EventService,
    private _saleService: SaleService,
    private _userService: UserService

  ){
    this.title = 'Dashboard';
    this.identity = this._userService.getIdentity();
    this.token = GLOBAL.getToken();

  }

    ngOnInit(){
    this.getEvents();
    }

    getEvents(){
    this._eventService.getEvents().subscribe(
      response => {
        if(!response.events){

        }else{

          // Función que recorre el contador del evento
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
    if(event.counter <= 0 && event.places != 0){
        event.counter++;
        event.places--;
        this.updateTotal(event);
    }

    console.log(event.counter);
    }

    eventDecrement(event){
    if(event.counter != 0){
        event.counter-- ;
        event.places++;
        this.updateTotal(event, true);
    }

    }

    updateTotal(event, decrement = false){

        let foundEvent = _.find(this.sale.events,{_id:event._id});
        if(!foundEvent){

            this.sale.events.push(
                _.assign({quantity:1},
                    _.pick(event, ['_id','name','places','price_esncard','price_no_esncard'])
                )
            );

        } else {

            foundEvent.quantity = event.counter;
            if(foundEvent.quantity == 0){
                _.pull(this.sale.events, foundEvent);
            }
        }

        this.sale.total_amount = _.reduce(this.sale.events, function(total, evnt){
            return total += evnt.price_esncard * evnt.quantity;
        }, 0);


    }

    addSale(event){
        this.updateTotal(event);
    }

    saveSale(event){
      console.log(this.sale);
      // Añadir Sale en base de datos
      this._saleService.addSale(this.token, this.sale).subscribe(
        response => {
          if(!response.sale){
            this.status = 'error;'
          }else{
            this.status = 'success';
            this.sale = response.sale;
          }
        },
        error => {
            var errorMessage = <any>error;

            if(errorMessage != null){
              this.status = 'error';
            }
        }
      );

      // Actualizar Evento en base de datos
      for (let event of this.sale.events) {
          this._eventService.editEvent(this.token, event._id, event).subscribe(
            response => {
              if(!response.event){
                this.status = 'error';
              }else{
                this.status = 'success';

                    event.places = this.sale.events['places'];


              }
            },
            error => {
                var errorMessage = <any>error;

                if(errorMessage !=null){
                  this.status = 'error';
                }
            }
          );
      }
    }




}
