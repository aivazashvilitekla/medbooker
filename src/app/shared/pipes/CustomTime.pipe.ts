import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns'
@Pipe({
  name: 'CustomTime'
})
export class CustomTimePipe implements PipeTransform {

  transform(value: string): string {
    return format(new Date(value), 'hh:mm');
  }

}
