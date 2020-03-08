import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { NewQuestionModule } from '../new-question/new-question.module';

@NgModule({
  declarations: [QuestionListComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    FormsModule,
    NewQuestionModule
  ],
  exports: [QuestionListComponent]
})
export class QuestionListModule {}
