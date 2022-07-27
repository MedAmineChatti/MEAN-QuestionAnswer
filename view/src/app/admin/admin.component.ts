 import { Component, OnInit } from '@angular/core';
 import{AwnserService} from '../../services/awnser.service';
 import{QuestionService} from '../../services/question.service';
 import { TagService  } from 'src/app/services/tag.service';
 import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
   
  answers :any = [];
  questions :any = [];
  tags:any= []; 
  users :any = [];


  constructor(
    private answerDataService: AwnserService,
    private questionDataService: QuestionService,
    private tagDataService: TagService,
    private userDataService: UserService,

  ) { } 
  
  ngOnInit(): void {
    this.readAnswers() 
    this.readQuestions() 
    this.readTags(); 
    this.readUsers(); 
  }

  readUsers() {
      this.userDataService.getAllUsers().subscribe((res) => {
          this.users = res; 
          console.table(this.users);

      });
  }

readTags() {
    this.tagDataService.getAllTags().subscribe((res) => {
        this.tags = res; 
        console.table(this.tags);

    });
}

  readQuestions() {
    this.questionDataService.getAllQuestions().subscribe((res) => {
        this.questions = res; 
        console.table(this.questions);
    });
  }

  readAnswers() {
    this.answerDataService.getAllAnswer().subscribe((res) => {
        this.answers = res; 
        console.table(this.answers );
    });
  }
  
  
}
