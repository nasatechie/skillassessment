import { Component, OnInit, HostBinding } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods } from '@angular/fire';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: { '[@moveIn]': '' }
})
export class LoginComponent implements OnInit {
  error: any;
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginWithFacebook() {
    this.AuthService.loginWithFacebook()
    .then(data => {
      this.router.navigate(['questionList']);
    })
    .catch( err => {
      console.log('err is', err);
    })
  }
  
  loginWithGoogle() {
    this.AuthService.loginWithGoogle().then(data => {
      this.router.navigate(['questionList']);
    })
    .catch( err => {
      console.log('err is', err);
    })
  }
}
