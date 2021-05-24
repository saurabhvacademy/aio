import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'trimData'
})

export class TrimdataPipe implements PipeTransform {
    transform(value:string,shortMe:number){
        if(typeof value != 'undefined'){

             if (shortMe){
                var len = shortMe;
                if(value.length>len){
                    value = value.slice(0,len-3)+"...";
                    return value;
                } 
                
            }
            
//            savedPostData:boolean,msg:boolean,msgName:boolean,widget:boolean,pageTitle:boolean,name:boolean,profileName:boolean,
//            if(pageTitle){
//                if(value.length>40){
//                    value = value.slice(0,39)+"...";   // for fileattachment name
//                    return value;
//                }
//            }
//            if(profileName){
//                if(value.length>30){
//                    value = value.slice(0,27)+"...";  // for name at profile, page, posts, share screen of posts(except shared)
//                    return value;
//                }
//            }
//            
//            if(widget){
//                if(value.length>17){
//                  //  value.replace(/\b\w/g,first => first.toLocaleUpperCase());  //normal name display
//                    value = value.slice(0,15)+"...";
//                }
//                return value;
//            }
//            if(name){
//                if(value.length>50){
//                    value = value.slice(0,49)+"...";
//                    return value;
//                }
//            }
//            if(savedPostData){
//                if(value.length>160){
//                    value = value.slice(0,150)+"...";
//                }               
//                return value;
//            }
//             if(msg){
//                if(msgName){
//                    if(value.length>12){
//                       // value.replace(/\b\w/g,first => first.toLocaleUpperCase());
//                        value = value.slice(0,10)+"...";
//                        return value;
//                    }else{
//                        if(value.length>16){
//                            value = value.slice(0,15)+"...";
//                            return value;
//                        }
//                    }
//                }
//                value = value.slice(0,100)+"...";
//                return value;
//            }
            
            if(value.length>300){
                value = value.replace(/ &#160;/g, '  ');
                value = value.slice(0, 300) + "...";
                // value = value.replace(/  /g," &#160;");
            }
            return value;
        }
    }
} 
