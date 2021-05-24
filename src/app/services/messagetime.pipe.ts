import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeformated'
})

export class MessagetimePipe implements PipeTransform {
    transform(value:any){
        var date = new Date(value);
        var day= date.getDate();
        var month = date.toLocaleString("en-us",{ month: "short" });
        var time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        var year = date.getFullYear();
        var currentTime =new Date();
        var currentTimetoday = Math.floor(Date.now());
        var diff =Math.abs(currentTimetoday - value) / 1000;
        var days = Math.floor(diff / 86400);
        var currentYear = currentTime.getFullYear();
        var year_diff = currentYear - year;
        var result="";
        if(days==0){
            diff -= days * 86400;
            var hour =  Math.floor(diff / 3600) % 24;
            diff -= hour * 3600;
            var min = Math.floor(diff / 60) % 60;
            if(min==0 && hour==0){
                result = "Just Now";
            }else if(min==0 && hour!=0){
                result = hour+" hr";
            }else if(min!=0 && hour==0){
                result = min+" min"; 
            }else {
                result = hour+" hr "+min+" min";
            }
        }else{
            if(year_diff==0){
                result = day+" "+month+" "+time;
            }else{
                result = day+" "+month+" "+year+" "+time;
            }
        }
        
        return result;
    }
}
