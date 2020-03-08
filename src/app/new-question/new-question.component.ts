import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../consts/question';
import { NewQuestionService } from './new-question.service';
import { Router } from '@angular/router';
import { SpeechRecognitionService } from '../services/SpeechRecognition.service';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' },
  // encapsulation: ViewEncapsulation.Emulated
})
export class NewQuestionComponent implements OnInit {
  state: string = '';
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private newQuestionService: NewQuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
  }

  logout() {}

  onSubmit() {
    const question: Question = this.formGroup.value;
    return this.newQuestionService.addQuestion(question).subscribe(_ => {
      this.router.navigate(['/questionList']);
    });
  }

  questionCaptured(questionText: string) {
    const qFormEle = this.formGroup.get('question');
    qFormEle.setValue(qFormEle.value + questionText);
  }

  answerCaptured(answerText: string) {
    const aFormEle = this.formGroup.get('answer');
    aFormEle.setValue(aFormEle.value + answerText);
  }
}
