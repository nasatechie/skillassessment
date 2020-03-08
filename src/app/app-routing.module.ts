import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewQuestionComponent } from './new-question/new-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { AuthService } from './auth/auth.service';
import { UserQuestionsComponent } from './user-questions/user-questions.component';
const routes: Routes = [
  {
    path: 'questionList',
    component: QuestionListComponent,
    // canActivate: [AuthService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'email',
    component: EmailComponent
  },
  {
    path: 'newQuestion',
    component: NewQuestionComponent,
    // canActivate: [AuthService]
  },
  {
    path: 'userQuestions',
    component: UserQuestionsComponent,
    // canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
