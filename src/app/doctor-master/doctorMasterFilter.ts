import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorMasterFilter'
})
export class doctorMasterFilter implements PipeTransform {

  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v: any) => v.doctor_name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
  }

}