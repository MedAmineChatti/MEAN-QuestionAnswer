import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import{QuestionService} from '../../../../services/question.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MyQuestionsComponent } from '../../../client/layouts/my-questions/my-questions.component';





@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.css']
})
export class AddQuestionDialogComponent implements OnInit {

  dropdownList:any = [];
  selectedItems:any = []; 
  dropdownSettings:any;

  newQuestion= new Question();
  data : any; 
  constructor(
    private questionDataService: QuestionService,
    private router: Router,
    public dialog: MatDialog,
      private dialogRef: MatDialogRef <MyQuestionsComponent>,
  ) { }

  ngOnInit(): void {
    this.data = localStorage.getItem('user');
    this.data = JSON.parse(this.data)
    console.log(this.data._id);
  }





  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }









  


  addQuestion() { 
    console.log(this.newQuestion);
    console.log(this.newQuestion)
    this.questionDataService.addQuestion(this.data._id,this.newQuestion).subscribe((res) =>{
      console.warn(res);

      Swal.fire({
        icon:'success',
        text:'Question added successfully',
        confirmButtonColor: "#00395D"
      }).then(()=>{ 
      this.dialogRef.close(false);

       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['home/myquestions' ]);
      } )  
    },(err:HttpErrorResponse) =>{

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
            confirmButtonColor: "#00395D"
          })

    }) 
   
} 

}
