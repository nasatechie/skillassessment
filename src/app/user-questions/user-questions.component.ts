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

  constructor(
    private questionListService: QuestionListService,
    private newQuestionService: NewQuestionService,
    private speechService: SpeechService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.languages$ = this.newQuestionService.getLanguages();
    this.skills$ = this.newQuestionService.getSkills();
    this.speechConfig = this.speechService.setupTextToSpeech();
  }

  fetchQuestions() {
    this.questionListService
      .getUserQuestions(this.criteria)
      .subscribe(qList => {
        this.questionList = [...qList];
        const qFormGroup = this.buildFormControls(qList);
        this.formGroup = this.fb.group(qFormGroup);
      });
  }

  answerCaptured(answerText: string, { id }: Question) {
    const aFormEle = this.formGroup.get(id);
    aFormEle.setValue(aFormEle.value + answerText);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const answers = this.processAnswers();
    this.questionListService.postUserAnswers(answers);
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
    return qIds.map(qId => ({ id: qId, answer: this.formGroup.value[qId] }));
  }
}
