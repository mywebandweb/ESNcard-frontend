export class Sale {

    public _id : string;
    //public id  : number;
    // Datos referidos a Event
    /*
        public name: string;
        public price_esncard: number;
        public price_no_esncard: number;
        public item: number
    */
    public events = [];
    // Datos referidos a Member
    /*
        public name: string;
        public surname: string;
        public numberesncard: string
    */
    //public member_id : number;
    // Datos referidos a User
    // usuario Vendedor
    /*
        public name: string;
        public surname: string
    */
    //public user_id : number;
    // Datos de Sale
    //public sale_date : string;
    //public places : number;
    public total_amount : number;

    constructor(events = [], total_amount = 0){

        //this.id  = id;
        this.events = events;
        //this.member_id = member_id;
        //this.user_id = user_id;
        //this.sale_date = sale_date;
        //this.places = places;
        this.total_amount = total_amount;
    }

}
