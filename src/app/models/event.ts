export class Event {

    public _id: string;
    public id : number;
    public name: string;
    public initial_date: string;
    public expiration_date: string;
    public price_esncard: number;
    public price_no_esncard: number;
    public places: number;
    public user: string;

  constructor(id = 1, name = '', initial_date = '', expiration_date = '',
  price_esncard = null, price_no_esncard = null, places = null, user = ''){
      this.id  = id;
      this.name = name;
      this.initial_date = initial_date;
      this.expiration_date = expiration_date;
      this.price_esncard = price_esncard;
      this.price_no_esncard = price_no_esncard;
      this.places = places;
      this.user = user;
  }
}
