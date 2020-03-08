import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [QuestionListComponent],
  imports: [CommonModule, RouterModule, MatCardModule],
  exports: [QuestionListComponent]
})
export class QuestionListModule {}
