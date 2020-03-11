import { Component, OnInit } from '@angular/core';
import {
  QuestionListService,
  FilterCriteria
} from '../question-list/question-list.service';
import { NewQuestionService } from '../new-question/new-question.service';
import { SpeechService } from '../services/speech.service';
import { Question } from '../consts/question';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.scss']
})
export class UserQuestionsComponent implements OnInit {
  criteria: FilterCriteria = {} as FilterCriteria;
  questionList: Question[];
  speechConfig: SpeechSynthesisUtterance;
  languages$: Observable<any[]>;
  skills$: Observable<any[]>;
  formGroup: FormGroup;
  disabled: boolean;

  constructor(
    private questionListService: QuestionListService,
    private newQuestionService: NewQuestionService,
    private speechService: SpeechService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.languages$ = this.newQuestionService.getLanguages();
    this.skills$ = this.newQuestionService.getSkills();
    this.speechConfig = this.speechService.setupTextToSpeech();
  }

  fetchQuestions() {
    console.log('this.criteria', this.criteria);
    this.questionListService.getUserQuestions(this.criteria).then(data => {
      data.subscribe(qList => {
        console.log('data is', qList);
        if(qList.length > 0) {
          this.disabled = false;
          this.questionList = [...qList];
          const qFormGroup = this.buildFormControls(qList);
          this.formGroup = this.fb.group(qFormGroup);
        }
        else {
          this.questionList = [];
          this.disabled = true;
        }
      });
    });
  }

  answerCaptured(answerText: string, { id }: Question) {
    const aFormEle = this.formGroup.get(id);
    aFormEle.setValue(aFormEle.value + answerText);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const answers = this.processAnswers();
    this.questionListService
      .postUserAnswers(answers, this.criteria.language, this.criteria.skill)
      .then(data => {
        this._snackBar.open('Answers submitted', 'OK', {
          duration: 5000
        });
        this.disabled = true;
      });
  }

  onExpanded(question: Question) {
    this.speechConfig.text = question.question;
    speechSynthesis.speak(this.speechConfig);
  }

  readQuestion(qId: string) {
    const q = this.questionList.find(q => q.id === qId);
    this.speechConfig.text = q.question;
    speechSynthesis.speak(this.speechConfig);
  }

  private buildFormControls(qList: Question[]) {
    return qList.reduce((fc, question) => {
      return {
        ...fc,
        [question.id]: new FormControl('')
      };
    }, {});
  }

  private processAnswers(): Partial<Question>[] {
    const qIds = Object.keys(this.formGroup.value);
    console.log('this.formgroup', this.formGroup.value);
    return qIds.map(qId => ({ id: qId, answer: this.formGroup.value[qId] }));
  }
}
