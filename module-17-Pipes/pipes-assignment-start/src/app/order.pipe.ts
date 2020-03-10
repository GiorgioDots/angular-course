import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order',
})
export class OrderPipe implements PipeTransform {

  transform(value: any, property: string): any {
    return value.sort((a, b) => {
      if(a[property] < b[property]){
        return -1;
      }
      if(b[property] < a[property]){
        return 1;
      }
      return 0;
    });
  }

}
