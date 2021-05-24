import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'decodeData'
})

export class DecodedataPipe implements PipeTransform {
    transform(value:string){
        if(value){
              return decodeURIComponent(value.replace(/[\u200B-\u200D\uFEFF\uFFFD]/g, '').trim());
        }
    }
} 
