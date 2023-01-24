import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class userFilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {
    // console.log(searchValue, value)
    if (!searchValue) return value;
    return value.filter((v: any) => v.user_name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}