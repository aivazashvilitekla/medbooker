import { Pipe, PipeTransform } from '@angular/core';
import { Attendee, AttendType, Roles } from 'src/app/models';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(value: Attendee[], attendeeType: AttendType): any {
    if (attendeeType === AttendType.PROVIDER) {
      const provider = value.filter(item => item.attendeeType === AttendType.PROVIDER);
      return `${provider[0].entity.firstName} ${provider[0].entity.lastName}`;
    }
    const patient = value.filter(item => item.attendeeType === AttendType.PATIENT);
    return `${patient[0].entity.firstName} ${patient[0].entity.lastName}`;
  }

}
