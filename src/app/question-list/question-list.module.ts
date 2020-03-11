import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './question-list.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { NewQuestionModule } from '../new-question/new-question.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LangsplitPipe } from '../langsplit.pipe';
import { SkillsplitPipe } from '../skillsplit.pipe';

@NgModule({
  declarations: [QuestionListComponent, LangsplitPipe, SkillsplitPipe],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    NewQuestionModule,
    MatIconModule
  ],
  exports: [QuestionListComponent, LangsplitPipe, SkillsplitPipe]
})
export class QuestionListModule {}
