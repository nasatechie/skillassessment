import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NewQuestionModule } from './new-question/new-question.module';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { QuestionListModule } from './question-list/question-list.module';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UserQuestionsModule } from './user-questions/user-questions.module';

const firebaseConfig = {
  apiKey: 'AIzaSyAq7w7JjM9xaOczSSB_KoWHMffMPnpiZ3U',
  authDomain: 'skillassessment-7c243.firebaseapp.com',
  databaseURL: 'https://skillassessment-7c243.firebaseio.com',
  projectId: 'skillassessment',
  storageBucket: 'skillassessment.appspot.com',
  messagingSenderId: '245700584438',
  appId: '1:245700584438:web:91cc59df8a0fd784f25dd7'
};

@NgModule({
  declarations: [AppComponent, LoginComponent, EmailComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NewQuestionModule,
    QuestionListModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    UserQuestionsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
