import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuestionsComponent } from './user-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { SkillPipe } from '../skill.pipe';
import { LangPipe } from '../lang.pipe';

@NgModule({
  declarations: [UserQuestionsComponent, SkillPipe, LangPipe],
  imports: [
    CommonModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [UserQuestionsComponent, SkillPipe, LangPipe]
})
export class UserQuestionsModule {}
