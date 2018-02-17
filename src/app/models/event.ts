export class Event {
  constructor(
    public _id: string,
    public name: string,
    public initial_date: string,
    public expiration_date: string,
    public price_esncard: number,
    public price_no_esncard: number,
    public places: number,
    public item: number,
    public user: string
  ){}
}
