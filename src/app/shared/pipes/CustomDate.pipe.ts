import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns'
@Pipe({
  name: 'CustomDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    return format(new Date(value), 'EEE, dd LLLL');
  }
}
