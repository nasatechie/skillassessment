import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './question-list.service';
import { Question } from '../consts/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questionList: Question[];
  constructor(private questionListService: QuestionListService) {}

  ngOnInit(): void {
    this.questionListService
      .getAllQuestions()
      .subscribe(qList => (this.questionList = [...qList]));
  }
}
