import { Component, Inject, OnInit } from '@angular/core';
import{AwnserService} from '../../../../services/awnser.service';
import { Awnser } from 'src/app/models/awnser';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AnswerMangmetComponent } from '../../../admin/layouts/answer-mangmet/answer-mangmet.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-answer-dialog',
  templateUrl: './edit-answer-dialog.component.html',
  styleUrls: ['./edit-answer-dialog.component.css']
})

export class EditAnswerDialogComponent implements OnInit {
  answer :any = [ ]; 
  answerId:any; 

  constructor(
    private answerDataService: AwnserService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef <AnswerMangmetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    this.answerId = this.data.answerId;
    console.log(this.answerId);
    this.answerDataService.getAnswerById(this.answerId).subscribe((res) => {
      this.answer=res;
      console.log(this.answer);

  })

}








updateAnswer(){
  console.log(this.answer);

 
    this.answerDataService.updateAnswer(this.answerId,this.answer).subscribe((res) =>{
      console.warn(res);
      Swal.fire({
        icon:'success',
        text:'Update  success',
        confirmButtonColor: "#00395D"
      }).then(()=>{
          this.dialogRef.close(false); 
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/dashboard/answermangment']);
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