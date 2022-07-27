import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ValidationEmailComponent } from './components/auth/validation-email/validation-email.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/utils/side-bar/side-bar.component';
import { UserMangmentComponent } from './components/admin/layouts/user-mangment/user-mangment.component';
 import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule} from 'ngx-pagination'; 
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from './components/utils/dialogs/edit-user-dialog/edit-user-dialog.component';
import { AdduserDialogComponent } from './components/utils/dialogs/adduser-dialog/adduser-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from './components/utils/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MyQuestionsComponent } from './components/client/layouts/my-questions/my-questions.component';
import { AddQuestionComponent } from './components/client/layouts/add-question/add-question.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddQuestionDialogComponent } from './components/utils/dialogs/add-question-dialog/add-question-dialog.component';
import { QuestionDetailsComponent } from './components/client/layouts/question-details/question-details.component';
import { TagsComponent } from './components/client/layouts/tags/tags.component';
import { TagMangmentComponent } from './components/admin/layouts/tag-mangment/tag-mangment.component';
import { AddTagDialogComponent } from './components/utils/dialogs/add-tag-dialog/add-tag-dialog.component';
import { EditTagDialogComponent } from './components/utils/dialogs/edit-tag-dialog/edit-tag-dialog.component';
import { TagDetailsComponent } from './components/client/layouts/tag-details/tag-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { QuestionMangmentComponent } from './components/admin/layouts/question-mangment/question-mangment.component';
import { AnswerMangmetComponent } from './components/admin/layouts/answer-mangmet/answer-mangmet.component';
 import { ContactAdminComponent } from './components/client/layouts/contact-admin/contact-admin.component';
import { EditQuestionDialogComponent } from './components/utils/dialogs/edit-question-dialog/edit-question-dialog.component';
import { AddAnswerDialogComponent } from './components/utils/dialogs/add-answer-dialog/add-answer-dialog.component';
import { EditAnswerDialogComponent } from './components/utils/dialogs/edit-answer-dialog/edit-answer-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/utils/chart/line-chart/line-chart.component';
import { BarChartComponent } from './components/utils/chart/bar-chart/bar-chart.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/not-auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ValidationEmailComponent,
    AdminComponent,
    ClientComponent,
    NotFoundComponent,
    HeaderComponent,
    SideBarComponent,
    UserMangmentComponent, 
    EditUserDialogComponent,
    AdduserDialogComponent,
    MyQuestionsComponent,
    AddQuestionComponent,
    AddQuestionDialogComponent,
    QuestionDetailsComponent,
    TagsComponent,
    TagMangmentComponent, 
    AddTagDialogComponent,
    EditTagDialogComponent,
    TagDetailsComponent,
       QuestionMangmentComponent,
        AnswerMangmetComponent,  
        ContactAdminComponent, 
        EditQuestionDialogComponent, 
        AddAnswerDialogComponent, 
        EditAnswerDialogComponent, 
        LineChartComponent, 
        BarChartComponent, 
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AngularEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgChartsModule

   ] ,
   providers:[
     AuthGuard,
     NotAuthGuard
    ]
   ,
  bootstrap: [AppComponent]
})



export class AppModule { }
