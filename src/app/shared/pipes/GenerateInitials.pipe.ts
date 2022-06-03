import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GenerateInitials'
})
export class GenerateInitialsPipe implements PipeTransform {

  transform(value: string): string {
    const fName = value.split(' ')[0].slice(0, 1)
    const lName = value.split(' ')[1].slice(0, 1)
    return `${fName}${lName}`;
  }

}
