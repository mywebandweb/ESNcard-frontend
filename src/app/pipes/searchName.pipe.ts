import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchName'
})

@Injectable()

export class SearchNamePipe implements PipeTransform{
  transform(items: any, term: any):any {
    if(term ==  undefined){
      return items;
    }
    return items.filter(function(item){
      return item.name.toLowerCase().includes(term.toLowerCase());
    });
  }
}

export class SearchOnListPipe implements PipeTransform{
    transform(id:number, items:any):any{
        if(!id || !items.length){return null;}
        return items.find(function(item){
            return item._id === id;
        })
    };
}
