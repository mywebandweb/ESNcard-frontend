import * as moment from 'moment/moment';

export class Event {

    public _id: string;
    public id : number;
    public name: string;
    public initial_date: Date;
    public expiration_date: String;
    public price_esncard: number;
    public price_no_esncard: number;
    public places: number;
    public comments: string;
    public show: boolean;
    public user: string;

  constructor(id = 1, name = '', initial_date = null, expiration_date = '',
  price_esncard = null, price_no_esncard = null, places = null, comments='', show = true, user = ''){
      this.id  = id;
      this.name = name;
      this.initial_date = initial_date;
      this.expiration_date = moment.utc(expiration_date).format();
      this.price_esncard = price_esncard;
      this.price_no_esncard = price_no_esncard;
      this.places = places;
      this.comments = comments;
      this.show = show;
      this.user = user;
  }
}
