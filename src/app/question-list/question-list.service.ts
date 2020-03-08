import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { QUESTIONS } from '../consts/question-list';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {
  constructor(private http: HttpClient) {}

  getAllQuestions() {
    // return this.http.get('/api/questions').pipe(tap(console.log));
    return of(QUESTIONS).pipe(delay(2000));
  }
}
