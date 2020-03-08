import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QuestionListService } from './question-list.service';
import { Question } from '../consts/question';
import { SpeechService } from '../services/speech.service';
import { Observable } from 'rxjs';
import { NewQuestionService } from '../new-question/new-question.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questionList: Question[];
  speechConfig: SpeechSynthesisUtterance;
  languages$: Observable<any[]>;
  skills$: Observable<any[]>;
  filter: any = {};
  allQuestions: Question[] = [];

  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(
    private questionListService: QuestionListService,
    private newQuestionService: NewQuestionService,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.questionListService.getAllQuestions().subscribe(qList => {
      this.allQuestions = qList;
      this.questionList = [...this.allQuestions];
    });

    this.languages$ = this.newQuestionService.getLanguages();
    this.skills$ = this.newQuestionService.getSkills();
    this.speechConfig = this.speechService.setupTextToSpeech();
  }

  readQuestion(qIndex: number) {
    const q = this.questionList[qIndex];
    this.speechConfig.text = `Question: ${q.question}`;
    speechSynthesis.speak(this.speechConfig);

    this.speechConfig.text = `Answer: ${q.answer}`;
    speechSynthesis.speak(this.speechConfig);
  }

  onSideNavClose(question: Question) {
    console.log(question);
    this.sidenav.close();
  }

  filterRecords() {
    console.log(this.filter);
    const { skill, lang } = this.filter;
    this.questionList = this.allQuestions.filter(q => {
      // console.log(!skill && !lang);
      // console.log(skill && lang && skill === q.skill && lang === q.language);
      console.log(skill && !lang && skill === q.skill);
      console.log(lang && !skill && lang === q.language);
      return (
        (!skill && !lang) ||
        (skill && lang && skill === q.skill && lang === q.language) ||
        (skill && !lang && skill === q.skill) ||
        (lang && !skill && lang === q.language)
      );
    });
  }
}
