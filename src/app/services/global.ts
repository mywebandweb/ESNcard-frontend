export var GLOBAL = {
  url: 'http://localhost:3789/api/',
  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }
}
