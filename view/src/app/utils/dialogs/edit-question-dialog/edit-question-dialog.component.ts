import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {  ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { QuestionMangmentComponent } from '../../../admin/layouts/question-mangment/question-mangment.component';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.css']
})
export class EditQuestionDialogComponent implements OnInit {
  question :any = [];
  
  questionId:any;
    
  constructor(
    private route: ActivatedRoute,
    private questionDataService: QuestionService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef <QuestionMangmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    this.questionId = this.data.questionId;
    console.log(this.questionId);
    this.questionDataService.getquestionbyId(this.questionId).subscribe((res) => {
      this.question=res;
  });
  }






  updateUser(){
    console.log(this.question);
 

      console.log(this.question);
      this.questionDataService.updateQuestion(this.questionId,this.question).subscribe((res) =>{
        console.warn(res);
        Swal.fire({
          icon:'success',
          text:'Update  success',
          confirmButtonColor: "#00395D"
        }).then(()=>{
            this.dialogRef.close(false); 
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/dashboard/questionmangment']);
        }) 
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
