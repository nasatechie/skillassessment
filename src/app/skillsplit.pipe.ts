import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillsplit'
})
export class SkillsplitPipe implements PipeTransform {

  transform(value) {
    return value[0].skill_level;
  }

}
