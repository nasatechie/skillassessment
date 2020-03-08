import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../consts/question';
import { of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { questionList } from '../consts/question-list';

@Injectable({
  providedIn: 'root'
})
export class NewQuestionService {
  constructor(private http: HttpClient) {}

  addQuestion(question: Question) {
    return this.http.post('/api/question', question);
  }
}
