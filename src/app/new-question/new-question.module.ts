import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NewQuestionComponent } from './new-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NewQuestionComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule
  ],
  exports: [NewQuestionComponent]
})
export class NewQuestionModule {}
