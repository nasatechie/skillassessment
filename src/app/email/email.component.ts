import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class EmailComponent implements OnInit {
  state: string = '';
  error: any;
  email: string = '';
  password: string = '';

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit(data: NgForm) {
    console.log('data is', data.value.email, data.value.password);
    this.AuthService.login(data.value.email, data.value.password)
      .then(res => {
        console.log('res is', res);
        if (res.user.emailVerified) {
          this.router.navigate(['newQuestion']);
        } else {
          this._snackBar.open('It is mandatory to verify your email before login', 'OK', {
            duration: 5000
          });
        }
      })
      .catch(err => {
        console.log('err is', err);
        this._snackBar.open(err.message, 'OK', {
          duration: 5000
        });
      });
  }

  ngOnInit(): void {}
}
