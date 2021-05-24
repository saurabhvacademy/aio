import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url, htmlSanitize:boolean) {
     if(htmlSanitize == null){
         htmlSanitize = false;
     }
     if(!htmlSanitize){
         return this.sanitizer.bypassSecurityTrustResourceUrl(url);

     } else{
         return this.sanitizer.bypassSecurityTrustHtml(url);

     }
  }

}
