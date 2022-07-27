import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddQuestionDialogComponent } from 'src/app/components/utils/dialogs/add-question-dialog/add-question-dialog.component';
import{QuestionService} from '../../../../services/question.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {
  title:any;
  questions :any = [];
  p:number = 1;
  userId: any;
  user: any;
  role: any;
  data: any;
  constructor(
        private questionDataService: QuestionService,

        public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.data = localStorage.getItem('user');
    this.data = JSON.parse(this.data)
    console.log(this.data._id);
    this.role = JSON.parse(this.data.role);
    console.log(this.data.role); 
    this.readQuestions();

  }

  openAddQuestionDialog(){
    this.dialog.open(AddQuestionDialogComponent, {
       maxHeight:"500px" ,   
       width:"50%" 
    })
  }

readQuestions() {
  
  this.questionDataService.getquestionsbyuserid(this.data._id).subscribe((res) => {
      this.questions = res; 
      console.log(res);
      var name1 = this.questions.description; 
      (<HTMLInputElement>document.getElementById('box')).innerHTML = name1;

  });
}

Search(){
  if(this.title==''){
      this.ngOnInit();
  }
  else { 
      this.questions = this.questions.filter((res: { title: string; } ) =>{  
          if (res.title !== "") { 
              return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase()); 
          } 
          else {  
              return this.ngOnInit();
          }        
      })
  }
}

aaaaa(des : any){ 
  (<HTMLInputElement>document.getElementById('description')).outerHTML = des ; 
} 
}
