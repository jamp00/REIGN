import { 
  Pipe,
  PipeTransform 
} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'niceDateFormatPipe',
})
export class niceDateFormatPipe implements PipeTransform {

  constructor() { }

  transform(value: string) {
//       console.log('Date del tiempo: ' +value);
    var _value = Date.parse(value);
  //console.log( value );
    var dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );

    if ( dif < 30 ){
         return convertToNiceDate(value);
    }else{
        var datePipe = new DatePipe("en-US");
        value = datePipe.transform(value, 'MMM-dd-yyyy');
        return value;
    }
 }

}


function convertToNiceDate(time: string) {
  var date = new Date(time),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);

  if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31)
      return '';
//console.log( date.toString() );
  var strTime = newFunction(date, diff);



  return daydiff == 0 && (
/*
      diff < 60 && "Just now" ||
      diff < 120 && "1 minute ago" ||
      diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
      diff < 7200 && "1 hour ago" ||
      diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
*/
      diff < 86400 && strTime) ||
      daydiff == 1 && "Yesterday" ||
      daydiff < 7 && daydiff + " days ago" ||
      daydiff < 31 && Math.ceil(daydiff / 7) + " week(s) ago";
}







function newFunction(date: Date, diff: number) {
  var datetime = date.toString().split(' ')[4];
  //console.log(datetime);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var minutes_ = "";
  var ampm = hours >= 12 ? 'pm' : 'am';
  if (diff < 86400) {
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes_ = minutes < 10 ? +'0' + minutes.toString() : minutes.toString();
    var strTime = hours + ':' + minutes_ + ' ' + ampm;
    //  console.log(strTime);
  }
  return strTime;
}

