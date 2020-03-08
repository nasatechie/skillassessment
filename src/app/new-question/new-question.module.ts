import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NewQuestionComponent } from './new-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
// import { SpeechModule } from 'ngx-speech';

@NgModule({
  declarations: [NewQuestionComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    // SpeechModule
  ],
  // providers: [
  //   {
  //     provide: 'SPEECH_LANG',
  //     useValue: 'en-US'
  //   }
  // ],
  exports: [NewQuestionComponent]
})
export class NewQuestionModule {}
