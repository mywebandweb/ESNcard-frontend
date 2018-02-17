export class Sale {
  constructor(
    public _id: string,
    // Datos referidos a Event
    public name: string,
    public price_esncard: number,
    public price_no_esncard: number,
    public item: number,
    // Datos referidos a User
    // usuario Vendedor
    public user: string,
    // Datos de Sale
    public item_event: number,
    public sale_date: string,
    public places: number
  ){}
}
