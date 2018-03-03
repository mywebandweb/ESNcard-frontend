import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class SaleService{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addSale (token, sale){
    let params = JSON.stringify(sale);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'sale', params, {headers: headers})
                     .map(res => res.json());
  }

}
