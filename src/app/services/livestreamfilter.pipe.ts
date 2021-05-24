import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterinvite'
})

export class livestreamFilter implements PipeTransform {
  active:number = 0;
  transform(items: any[],value:number,type:string){
    if(type == '0'){
      if(value == 1){
  this.active =0;
        return items;
      }else if(value == 2){
        return items.filter(e=>{
          for (let j = 0; j < e.LIVE_STREAM.length; j++) {
            if(e.LIVE_STREAM[j].STATUS == 1){
              this.active = this.active +1;
              //return true;
            }
            else{

            }
          }
          if(this.active >= 1 ){
            this.active =0;
            return true;

          }else{
            this.active =0;
            return false;

          }
        });

      }
      else if(value == 0){
        return items.filter(e=>{
          for (let j = 0; j < e.LIVE_STREAM.length; j++) {
            if(e.LIVE_STREAM[j].STATUS == 0){
              // return true;
              this.active = this.active +1;
            }
            else{
              // return false;
            }
          }

          if(this.active >= 1 ){
            this.active =0;
            return true;

          }else{
            this.active =0;
            return false;

          }
        });
      }
    }
    else{
      if(value == 1){
        this.active =0;
        return items;
      }
      else if(value == 2){
        return items.filter(e=>{
          if(e.STATUS == 1){
            return true;
          }
          else{
            return false;
          }
        });
      }
      else if(value == 0){
        return items.filter(e=>{
          if(e.STATUS == 0){
            return true;
          }
          else{
            return false;
          }
        });
      }
    }
  }
}
