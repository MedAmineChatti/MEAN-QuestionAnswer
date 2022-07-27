import { Component, OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import{QuestionService} from '../../../../services/question.service';
import {ActivatedRoute} from '@angular/router';
import{UserService} from '../../../../services/user.service';
import{AwnserService} from '../../../../services/awnser.service';
import{Question} from 'src/app/models/question';
import{Awnser} from 'src/app/models/awnser';
import {MatDialog} from '@angular/material/dialog';
import { AddAnswerDialogComponent } from 'src/app/components/utils/dialogs/add-answer-dialog/add-answer-dialog.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

 
@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
 
  question: any = new Question();
  questionId:any;
  user: any;
  awnsers: any = new Awnser();
  u: any;
 
  constructor(

    private questionDataService: QuestionService,
    private awnserDataService: AwnserService, 
    private route: ActivatedRoute,
    private userDataService:UserService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('id');
    this.readQuestion();
    this.readAwnsers();
  }


  readQuestion() {
  

    
    this.questionDataService.getquestionbyId(this.questionId).subscribe((res) => {
        this.question = res; 
        console.log(this.question);  
        var name1 = this.question.description; 
        (<HTMLInputElement>document.getElementById('box')).innerHTML = name1 ;
    });
  }


  readAwnsers(){
    this.awnserDataService.getAwnsersByQuestionId(this.questionId).subscribe ((res) => {
      this.awnsers = res; 
      console.table(this.awnsers );  
    })
  }

 
  openAddAnswerDialog(questionId : any){
    console.log(questionId);
      this.dialog.open(AddAnswerDialogComponent, { 
      maxHeight:"500px" ,   
      width:"50%" ,
      data: { 
        questionId: questionId
      }
   })
  } 
 
  aaaaa(des : any){ 
        (<HTMLInputElement>document.getElementById('box2')).outerHTML = des ; 
  } 

  addOneRaitingAnswer(id:any) { 

    Swal.fire({
      title: 'Are you sure?',
      text: "You add like to this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
  }).then((result) => {
    if (result.isConfirmed) { 
      this.awnserDataService.addOneRaitingAnswer(id).subscribe((res) => {  
            Swal.fire( {
                title: 'Like Added', 
                icon: 'success'          
            })
            .then(()=>{
                this.ngOnInit();
            })
        })  
    } 
}) 
     
 
  }
  subtractOneRaitingAnswer(id:any) { 
    Swal.fire({
      title: 'Are you sure?',
      text: "You subtract like to this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Subtract it!'
  }).then((result) => {
    if (result.isConfirmed) { 
      this.awnserDataService.subtractOneRaitingAnswer(id).subscribe((res) => {  
            Swal.fire( {
                title: 'Like Subtracted',  
                icon: 'success'          
            })
            .then(()=>{
                this.ngOnInit();
            })
        })  
    } 
}) 
  }


}
