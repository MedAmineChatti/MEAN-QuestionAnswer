import { Component, OnInit } from '@angular/core';
import{QuestionService} from '../../services/question.service';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  questions :any = [];
  p:number = 1;
  userId: any;
  title:any;
  constructor(
    private questionDataService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('loggedUser');
    this.readQuestions()
  }

  readQuestions() {
    this.questionDataService.getAllQuestions().subscribe((res) => {
        this.questions = res; 
        console.table(res);
    });
  }

  Search(){
    if(this.title==''){
        this.ngOnInit();
    }
    else { 
        this.questions = this.questions.filter((res: { title: string; } ) =>{  
            if (res.title !== "") { 
              console.log( res.title);

                return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase()); 
            } 
            else {  
                return this.ngOnInit();
            }        
        })
    }
  }

}
