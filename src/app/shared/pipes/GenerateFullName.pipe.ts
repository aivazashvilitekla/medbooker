import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GenerateFullName'
})
export class GenerateFullNamePipe implements PipeTransform {

  transform(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }

}
