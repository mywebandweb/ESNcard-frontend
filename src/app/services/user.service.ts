import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'register', params, {headers: headers})
                     .map(res => res.json());
  }

  signup(user_to_login, gettoken = null){
      if(gettoken != null){
        user_to_login.gettoken = gettoken;
      }

      let params = JSON.stringify(user_to_login);
      let headers = new Headers({'Content-Type':'application/json'});

      return this._http.post(this.url+'login', params, {headers: headers})
                       .map(res => res.json());
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization': GLOBAL.getToken()
    });

    return this._http.put(this.url+'update-user/'+user_to_update._id, params, {headers: headers})
                     .map(res => res.json());
  }

  getUser(id){
    return this._http.get(this.url+'user/'+id).map(res => res.json());
  }

  editUser(token, id, user){
    let params = JSON.stringify(user);
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
        });
      return this._http.put(this.url+'user/'+id, params, {headers: headers})
                       .map(res => res.json());
    }

}
