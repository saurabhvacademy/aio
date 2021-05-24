import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showSelecteAnswer'
})
export class ShowSelecteAnswerPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    var ret = value.slice(2,3).toUpperCase();
    return ret;
  }

}
