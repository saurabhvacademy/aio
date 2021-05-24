import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ntimes'
})

export class numbertimes implements PipeTransform {
    transform(value:number,startsfrom1:boolean):any {
        if(startsfrom1){
            let res = [];
        for (let i = 1; i <= value; i++) {
            
            res.push(i);
          }
          return res;
        }else{
        let res = [];
        for (let i = 0; i <= value; i++) {
            if(i<10){
              var num = i;
            }else{
                num = i;
            }
            res.push(num);
          }
          return res;
            }
        }
}
