import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ValidationEmailComponent } from './components/auth/validation-email/validation-email.component';
import { ClientComponent } from './components/client/client.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserMangmentComponent } from './components/admin/layouts/user-mangment/user-mangment.component';
 import { MyQuestionsComponent } from './components/client/layouts/my-questions/my-questions.component';
import { AddQuestionComponent } from './components/client/layouts/add-question/add-question.component';
import { QuestionDetailsComponent } from './components/client/layouts/question-details/question-details.component';
import { TagsComponent } from './components/client/layouts/tags/tags.component';
import { TagMangmentComponent } from './components/admin/layouts/tag-mangment/tag-mangment.component';
import { TagDetailsComponent } from './components/client/layouts/tag-details/tag-details.component';
import { QuestionMangmentComponent } from './components/admin/layouts/question-mangment/question-mangment.component';
import { AnswerMangmetComponent } from './components/admin/layouts/answer-mangmet/answer-mangmet.component';
import { ContactAdminComponent } from './components/client/layouts/contact-admin/contact-admin.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/not-auth.guard';

    
  
const routes: Routes = [
  {path: '', component: LoginComponent,canActivate:[NotAuthGuard]},
  {path: 'register', component: RegisterComponent,canActivate:[NotAuthGuard]},
  {path: ':id/verify/:emailToken', component: ValidationEmailComponent,canActivate:[NotAuthGuard]},
  {path: 'home', component: ClientComponent,canActivate:[AuthGuard]},
  {path: 'dashboard', component: AdminComponent,canActivate:[AuthGuard]}, 
  {path: 'dashboard/usermangment', component: UserMangmentComponent,canActivate:[AuthGuard]}, 
  {path: 'dashboard/tagmangment', component: TagMangmentComponent,canActivate:[AuthGuard]}, 
  {path: 'dashboard/questionmangment', component: QuestionMangmentComponent,canActivate:[AuthGuard]}, 
  {path: 'dashboard/answermangment', component: AnswerMangmetComponent,canActivate:[AuthGuard]}, 
  {path: 'home/addquestion', component: AddQuestionComponent,canActivate:[AuthGuard]},
  {path: 'home/myquestions', component: MyQuestionsComponent,canActivate:[AuthGuard]}, 
  {path: 'questiondetails/:id', component: QuestionDetailsComponent,canActivate:[AuthGuard]},
  {path: 'home/tags', component: TagsComponent,canActivate:[AuthGuard]},
  {path: 'home/contact', component: ContactAdminComponent,canActivate:[AuthGuard]}, 

  {path: 'tagdetails/:title', component: TagDetailsComponent,canActivate:[AuthGuard]},


  {path: '**', component:NotFoundComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
