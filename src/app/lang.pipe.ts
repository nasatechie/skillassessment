import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  transform(value): unknown {
    return value[0].technologies;
  }

}
