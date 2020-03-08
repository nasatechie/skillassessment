import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../consts/question';
import { NewQuestionService } from './new-question.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  formGroup: FormGroup;
  languages$: Observable<any[]>;
  skills$: Observable<any[]>;
  @Input() question: Question;
  @Output() close = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private newQuestionService: NewQuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      skill: ['', Validators.required],
      language: ['', Validators.required]
    });

    this.languages$ = this.newQuestionService.getLanguages();
    this.skills$ = this.newQuestionService.getSkills();

    if (this.question) {
      this.formGroup.patchValue({ ...this.question });
    }
  }

  onSubmit() {
    const question: Question = this.formGroup.value;
    // return this.newQuestionService.addQuestion(question).subscribe(_ => {
    //   this.router.navigate(['/questionList']);
    // });
    this.close.emit(question);
  }

  onCancel() {
    this.close.emit();
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
