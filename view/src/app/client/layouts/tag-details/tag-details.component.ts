import { Component, OnInit } from '@angular/core';
import{QuestionService} from '../../../../services/question.service';
import {ActivatedRoute} from '@angular/router';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.css']
})
export class TagDetailsComponent implements OnInit {
  questions:any;
  tagName:any;
  title:any;
  p:any;
  tagData: any;
  
  constructor(
     private questionDataService: QuestionService,
     private route: ActivatedRoute,
     private router: Router

  ) { }

  ngOnInit(): void {
    this.tagName = this.route.snapshot.paramMap.get('title');
this.readQuestions();
this.readTag() ;
  }



  readQuestions() { 
    this.questionDataService.getQuestionsbyTagName(this.tagName).subscribe((res) => {
        this.questions = res; 
        console.log(this.questions);  
    });
  }




  readTag() { 
    this.questionDataService.getTagbyTagName(this.tagName).subscribe((res) => {
        this.tagData = res; 
        console.log(this.tagData);  
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


switchTag (tag:any ) {
  this.router.navigate(['/tagdetails/', tag]);
  this.ngOnInit();
}
}