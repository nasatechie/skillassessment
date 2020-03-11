import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../consts/question';
import { of, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { SKILLS, LANGUAGES } from '../consts/question-list';
import 'firebase/firestore';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NewQuestionService {
  item: Observable<any>;
  constructor(
    private http: HttpClient,
    private AF: AngularFirestore
  ) {}

  async addQuestion(question: Question) {
    // return this.http.post('/api/question', question);
    return await this.AF.collection('questions').add({
      id: uuidv4(),
      question: question.question,
      answer: question.answer,
      author_email: JSON.parse(localStorage.getItem('user')).email,
      skill_level: question.skill,
      technology: question.language,
      uuid: JSON.parse(localStorage.getItem('user')).uid
    });
  }

  getSkills(): Observable<any[]> {
    // return of(SKILLS);
    const data = this.AF.collection('techskills').valueChanges();
    console.log('data is', data)
    return data;
    // .subscribe( elm => {
    //   console.log('elm is', elm);
    //   return elm;
    // })
    // return this.http.get('/api/skills').pipe(map((skills: any[]) => skills));
  }

  getLanguages(): Observable<any[]> {
    return of(LANGUAGES);
    // return this.http.get('/api/languages').pipe(map((langs: any[]) => langs));
  }
}
