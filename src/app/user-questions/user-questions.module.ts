import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuestionsComponent } from './user-questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserQuestionsComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    SharedModule
  ],
  exports: [UserQuestionsComponent]
})
export class UserQuestionsModule {}
