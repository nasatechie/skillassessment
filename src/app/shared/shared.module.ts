import { NgModule } from '@angular/core';
import { RecordDirective } from './record/record.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RecordDirective],
  imports: [CommonModule],
  exports: [RecordDirective]
})
export class SharedModule {}
