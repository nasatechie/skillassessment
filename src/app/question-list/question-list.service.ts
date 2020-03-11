import { HttpClient } from '@angular/common/http';
import { delay, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { QUESTIONS } from '../consts/question-list';
import { of } from 'rxjs';
import { Question } from '../consts/question';
import { AngularFirestore } from '@angular/fire/firestore';

export interface FilterCriteria {
  skill: string;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {
  constructor(private http: HttpClient, private AF: AngularFirestore) {}

  getAllQuestions() {
    // return this.http.get('/api/questions').pipe(tap(console.log));
    // return of(QUESTIONS).pipe(delay(2000));
    return this.AF.collection<Question>('questions').valueChanges();
  }

  async getUserQuestions(criteria: FilterCriteria) {
    // return of(QUESTIONS).pipe(delay(2000));
    console.log('criteria is', criteria);
    // criteria.language = criteria.language ? criteria.language : ' ';
    // criteria.skill = criteria.skill ? criteria.skill : ' ';
    if (criteria && criteria.language && criteria.skill) {
      return this.AF.collection<Question>('questions', ref =>
        ref
          .where('skill_level', '==', criteria.skill)
          .where('technology', '==', criteria.language)
      ).valueChanges();
    } else {
      return this.AF.collection<Question>('questions').valueChanges();
    }
  }

  postUserAnswers(data: Partial<Question>[], language, skill) {
    console.log(data);
    // return of(data);
    // var result = data.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o['technology'] = language;
    //   o['skill_level'] = skill;
    //   o['user_name'] = JSON.parse(localStorage.getItem('user')).email;
    //   o['uuid'] = JSON.parse(localStorage.getItem('user')).uid;
    //   return o;
    // });
    language = language ? language : '';
    skill = skill ? skill : '';
    let result = {
      user_name: JSON.parse(localStorage.getItem('user')).email,
      uuid: JSON.parse(localStorage.getItem('user')).uid,
      technology: language,
      skill_level: skill,
      data: data
    };
    return this.AF.collection('user_data').add(result);
  }
}
