import { HttpClient } from '@angular/common/http';
import { questionList } from '../consts/question-list';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {
  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get('/api/questions').pipe(tap(console.log));
    // return of(questionList).pipe(delay(2000));
  }
}
