import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class MemberService{
  public url: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addMember(token, member){
    let params = JSON.stringify(member);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'member', params, {headers: headers})
                     .map(res => res.json());
  }

  getMembers(){
    return this._http.get(this.url+'members').map(res => res.json());
  }

  getMember(id){
    return this._http.get(this.url+'member/'+id).map(res => res.json());
  }

  editMember(token, id, member){
    let params = JSON.stringify(member);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'member/'+id, params, {headers: headers})
                     .map(res => res.json());
  }

  deleteMember(token, id){
    let headers = new Headers({
      'Content_type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'member/'+id, options)
               .map(res => res.json());
  }
}
