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

  getSaleEvent(id){
    return this._http.get(this.url+'sale/'+id).map(res => res.json());
  }

  getSales(){
    return this._http.get(this.url+'sales').map(res => res.json());
  }

  deleteSale(token, id){
    let headers = new Headers({
      'Content_type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'sale/'+id, options)
               .map(res => res.json());
  }

}
