import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: false
})

@Injectable()
export class ReversePipe implements PipeTransform {
  transform (values) {
    if (values) {
      return values.reverse();
    }
  }
}
