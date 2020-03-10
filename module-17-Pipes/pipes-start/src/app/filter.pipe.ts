import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false//to recalculate filter every time some data changes
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0){
      return value;
    }
    let resultArray = []
    for(let item of value){
      if (item[propName].includes(filterString)){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
