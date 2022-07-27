import { Component, OnInit } from '@angular/core';
import{AwnserService} from '../../../../services/awnser.service';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditAnswerDialogComponent } from 'src/app/components/utils/dialogs/edit-answer-dialog/edit-answer-dialog.component';





@Component({
  selector: 'app-answer-mangmet',
  templateUrl: './answer-mangmet.component.html',
  styleUrls: ['./answer-mangmet.component.css']
})
export class AnswerMangmetComponent implements OnInit {
  answers :any = [];
  p:any;
  user:any;
  description:any;
  constructor( 
    private answerDataService: AwnserService,
    private router: Router,
    public dialog: MatDialog


  ) { }

  ngOnInit(): void {
    this.readAnswers() 
  }

  readAnswers() {
    this.answerDataService.getAllAnswer().subscribe((res) => {
        this.answers = res; 
        console.table(res);
    });
  }
  Search(){
   console.log(this.description)
    if(this.answers==''){
        this.ngOnInit();
    }
    else { 
        this.answers = this.answers.filter((res: { decscription: string; } ) =>{  
            if (res.decscription !== "") { 
                return res.decscription.toLocaleLowerCase().match(this.description.toLocaleLowerCase()); 
            } 
            else {  
                return this.ngOnInit();
            }        
        })
    }
}








removeAnswer( id:any) {   
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
          this.answerDataService.deleteAnswerById(id).subscribe((res) => {  
              Swal.fire( {
                  title: 'Deleted!',
                  text: 'Your file has been deleted.',
                  icon: 'success'          
              })
              .then(()=>{
                  this.readAnswers();
              })
          })  
      } 
  }) 
} 











openEditAnswerDialog( answerId:any){
    this.dialog.open(EditAnswerDialogComponent, { 
        data: { 
        answerId: answerId
      },
    });
}









}
