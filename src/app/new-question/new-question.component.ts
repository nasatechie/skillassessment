import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../consts/question';
import { NewQuestionService } from './new-question.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  languages$: Observable<any[]>;
  skills$: Observable<any[]>;
  @Input() question: Question;
  @Output() close = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private newQuestionService: NewQuestionService,
    private router: Router,
    private _snackBar: MatSnackBar
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.question) {
      this.formGroup.patchValue({ ...this.question });
    } else if (this.formGroup) {
      this.formGroup.reset();
    }
  }

  onSubmit() {
    const question: Question = { ...this.question, ...this.formGroup.value };
    console.log('queston is', question.skill.toString());
    if (question.skill) {
      this.newQuestionService
        .addQuestion(question)
        .then(data => {
          this._snackBar.open('Question Added', 'OK', { duration: 5000 });
          this.formGroup.reset();
        })
        .catch(err => {
          console.log('err is', err);
        });
    }
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

  addSkill(): void {
    console.log('addskill');
    this.router.navigate(['/addskill']);
  }

  viewQuestions(): void {
    this.close.emit();
    this.router.navigate(['/questionList']);
  }
}
