import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../consts/question';
import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { SKILLS, LANGUAGES } from '../consts/question-list';

@Injectable({
  providedIn: 'root'
})
export class NewQuestionService {
  constructor(private http: HttpClient) {}

  addQuestion(question: Question) {
    // return this.http.post('/api/question', question);
  }

  getSkills(): Observable<any[]> {
    return of(SKILLS);
    // return this.http.get('/api/skills').pipe(map((skills: any[]) => skills));
  }

  getLanguages(): Observable<any[]> {
    return of(LANGUAGES);
    // return this.http.get('/api/languages').pipe(map((langs: any[]) => langs));
  }
}
