
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateview'
})

export class DateviewPipe implements PipeTransform {
    transform(value:any){
        if(value){
            var arr = value.split("-");
            var month ='';
            switch(arr[1]){
                case '01':
                    month="Jan";
                    break;
                case '02':
                    month="Feb";
                    break;
                case '03':
                    month="Mar";
                    break;
                case '04':
                    month="Apr";
                    break;
                case '05':
                    month="May";
                    break;
                case '06':
                    month="Jun";
                    break;
                case '07':
                    month="Jul";
                    break;
                case '08':
                    month="Aug";
                    break;
                case '09':
                    month="Sept";
                    break;
                case '10':
                    month="Oct";
                    break;
                case '11':
                    month="Nov";
                    break;
                case '12':
                    month="Dec";
                    break;        
            }
            var date = new Date();
            var year = date.getFullYear();
            if((year==arr[0]) &&(date.toLocaleString("en-us",{ month: "short" })==month)){
                value = "Present";
                return value;
            }
//            value  = arr[2]+" "+month+" "+arr[0]; 
            value  = month+" "+arr[0]; 
        }
        return value;
    }
} 