import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import _ from "lodash";

import { GLOBAL } from '../../services/global';
import { EventService } from '../../services/event.service';
import { SaleService } from '../../services/sale.service';
import { UserService } from '../../services/user.service';
import { Event } from '../../models/event';
import { Sale } from '../../models/sale';

import * as moment from 'moment/moment';


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
    // this.initialDate = moment(this.event.initial_date).format('DD-MM-YYYY');
  }

    ngOnInit(){
        this.getEvents();
    }

    showEvent(event) {

        let EXP = moment.utc(event.expiration_date).format('MM-DD-YYYY');
        let today = moment().format('DD-MM-YYYY');
        let compareDate = moment(EXP).isBefore(today);

        console.log('Name: ',event.name);
        console.log(compareDate);
        console.log('EXP: ', EXP);
        console.log('Today: ', today);

        if ( compareDate == true ) {
            event.show = true;
        } else {
            event.show = false;
            _.pull(this.events, event);
        }
            // console.log('Name: ',event.name);
            // console.log('ExpDate: ',event.expiration_date);
            // console.log('Today: ',today);
            // console.log('Show: ',event.show);

        // console.log(show);
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
          for (let event of response.events) {
              event.initial_date = moment(event.initial_date).format('DD/MM/YYYY');
              event.expiration_date = moment(event.expiration_date).format('DD-MM-YYYY');
              this.showEvent(event);
          }
        }
      },
      error => {
        console.log(<any>error)
      }
    );
    }

    getSaleEvent(){
      this._route.params.forEach((params: Params) => {
        let id = params['id'];

        this._saleService.getSaleEvent(id).subscribe(
          response => {
            if(!response.event){

            }else{
              this.sale = response.sale;
            }
          },
          error => {
            console.log(<any>error);

          }
        );
      });
    }

    getEvent(){
      this._route.params.forEach((params: Params) => {
        let id = params['id'];

        this._eventService.getEvent(id).subscribe(
          response => {
            if(!response.event){
            }else{
              this.event = response.event;
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      });
    }

    deleteSaleEvent(event){

        let foundEvent = _.find(this.sale.events,{_id:event._id});
        console.log(foundEvent);
        console.log(foundEvent._id);

        if(foundEvent.quantity != 0 && foundEvent._id){
            foundEvent.quantity--;
            foundEvent.places++;
            foundEvent.counter = foundEvent.quantity;
            console.log(foundEvent.counter);
        }

        console.log(event.counter);
        _.pull(this.sale.events, foundEvent);

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
