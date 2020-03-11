import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skill'
})
export class SkillPipe implements PipeTransform {
  transform(value): unknown {
    return value[0].skill_level;
  }
}
