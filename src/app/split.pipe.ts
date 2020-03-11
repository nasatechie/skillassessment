import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitSkill'
})
export class SplitSkillPipe implements PipeTransform {
  transform(value) {
    // console.log('value split is', value);
    return value[0].skill_level;
  }
}

@Pipe({
  name: 'splitLang'
})
export class SplitLangPipe implements PipeTransform {
  transform(value) {
    // console.log('value split is', value);
    return value[0].technologies;
  }
}
