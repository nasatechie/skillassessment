import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class SignupComponent implements OnInit {
  state: string = '';
  error: any;
  email: string = '';
  password: string = '';
  roles: Array<string> = ['admin', 'user'];
  role: string = '';
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private AF: AngularFirestore
  ) {}

  onSubmit(data: NgForm, role) {
    console.log('data is', data.value.email, data.value.password);
    console.log('role is', role);
    this.AuthService.register(data.value.email, data.value.password)
      .then(result => {
        console.log('result is', result);
        this.AF.collection('users').add({
          role: role,
          user_email: result.user.email,
          uuid: result.user.uid
        });
        this.AuthService.sendEmailVerification().then(data => {
          console.log('data wwwws', data);
          // this.AF.collection('users').valueChanges();
          this._snackBar.open(
            'Account created..!! please check your email & verify',
            'OK',
            {
              duration: 5000
            }
          );
          setTimeout(() => {
            this.router.navigate(['email']);
          }, 5000);
        });
      })
      .catch(err => {
        console.log('err is', err);
        this._snackBar.open(err.message, 'OK', {
          duration: 5000
        });
      });
  }
  select_role(event){
    this.role = event.value;
  }
  ngOnInit(): void {}
}
