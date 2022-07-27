import { Component, Inject, OnInit } from '@angular/core';
import{AwnserService} from '../../../../services/awnser.service';
import { Awnser } from 'src/app/models/awnser';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
 import { QuestionDetailsComponent } from '../../../client/layouts/question-details/question-details.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-answer-dialog',
  templateUrl: './add-answer-dialog.component.html',
  styleUrls: ['./add-answer-dialog.component.css']
})

export class AddAnswerDialogComponent implements OnInit {
  newAwnser = new Awnser();

  questionId:any;
  constructor(
      private awnserDataService: AwnserService,
      private router: Router,
      public dialog: MatDialog,
      private dialogRef: MatDialogRef <QuestionDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }
  ngOnInit(): void {
    this.questionId = this.data.questionId;

  }





   
  addAnswer(){

  

    console.log( 'FIRST : '+this.newAwnser);
    this.awnserDataService.addAnswer(this.questionId,this.newAwnser).subscribe((res) =>{
      console.warn(res);
      Swal.fire({
        icon:'success',
        text:'Answer added successfully',
        confirmButtonColor: "#00395D"
      }).then(()=>{ 
      this.dialogRef.close(false);

       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/questiondetails/'+this.questionId]);
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
