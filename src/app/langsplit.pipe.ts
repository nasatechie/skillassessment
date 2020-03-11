import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langsplit'
})
export class LangsplitPipe implements PipeTransform {

  transform(value){
    return value[0].technologies;
  }

}
