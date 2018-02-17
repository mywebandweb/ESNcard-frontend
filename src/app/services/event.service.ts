import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class EventService{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addEvent (token, event){
    let params = JSON.stringify(event);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'event', params, {headers: headers})
                     .map(res => res.json());
  }

  getEvents(){
    return this._http.get(this.url+'events').map(res => res.json());
  }

  getEvent(id){
    return this._http.get(this.url+'event/'+id).map(res => res.json());
  }

  editEvent(token, id, event){
    let params = JSON.stringify(event);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'event/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteEvent(token, id){
    let headers = new Headers({
      'Content_type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'event/'+id, options)
               .map(res => res.json());
  }
}
