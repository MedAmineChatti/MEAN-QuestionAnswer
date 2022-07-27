import { Component, OnInit } from '@angular/core';
import{QuestionService} from '../../../../services/question.service';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditQuestionDialogComponent } from 'src/app/components/utils/dialogs/edit-question-dialog/edit-question-dialog.component';

@Component({
  selector: 'app-question-mangment',
  templateUrl: './question-mangment.component.html',
  styleUrls: ['./question-mangment.component.css']
})
export class QuestionMangmentComponent implements OnInit {
  questions :any = [];
  p:any;
  title:any
  
  constructor(
    private questionDataService: QuestionService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.readQuestions() 
  }

  readQuestions() {
    this.questionDataService.getAllQuestions().subscribe((res) => {
        this.questions = res; 
        console.log(res);
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




removeQuestion( id:any) {   
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  })
  .then((result) => {
      if (result.isConfirmed) { 
          this.questionDataService.deleteQuestion(id).subscribe((res) => {  
              Swal.fire( {
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success'          
              })
              .then(()=>{
                  this.readQuestions();
              })
          })  
      } 
  }) 
} 



openEditQuestionDialog( questionId : any)  {
    this.dialog.open(EditQuestionDialogComponent, {  
        data: { 
        questionId: questionId
      },
    });
  }
}
