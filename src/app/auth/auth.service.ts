import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable, from } from 'rxjs';
// import { do, map, take } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // CanActivate(): Observable<boolean> {
  //   return from(this.afAuth)
  //   .take(1)
  //   .map( state => !!state)
  //   .do( authenticated => {
  //     if(!authenticated) {
  //       this.router.navigate(['/login']);
  //     }
  //   })
  // } 
  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
    // console.log('result is', result);
    // this.router.navigate(['questionList']);
  }
  async register(email: string, password: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    )
  }
  async sendEmailVerification() {
    return await this.afAuth.auth.currentUser.sendEmailVerification();
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
  async loginWithGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  async loginWithFacebook() {
    console.log('inside facebook')
    return await this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
}