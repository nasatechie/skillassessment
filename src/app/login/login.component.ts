import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from '@angular/fire';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: { '[@moveIn]': '' }
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private AF: AngularFirestore
  ) {}

  ngOnInit(): void {}

  loginWithFacebook() {
    this.AuthService.loginWithFacebook()
      .then(data => {
        this.AF.collection('users').add({
          role: 'user',
          user_email: data.user.email,
          uuid: data.user.uid
        });
        this.router.navigate(['userQuestions']);
      })
      .catch(err => {
        console.log('err is', err);
      });
  }

  loginWithGoogle() {
    this.AuthService.loginWithGoogle()
      .then(data => {
        console.log('data gmail is', data);
        this.AF.collection('users').add({
          role: 'user',
          user_email: data.user.email,
          uuid: data.user.uid
        });
        this.router.navigate(['userQuestions']);
      })
      .catch(err => {
        console.log('err is', err);
      });
  }
}
