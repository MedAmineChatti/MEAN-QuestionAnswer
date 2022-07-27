import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
 
 

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    public http : HttpClient,
    public authDataService: AuthService
  ) { }


  //Get all Question
  getAllQuestions() { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get('http://localhost:5000/user/getallquestions', { headers : headers} );
  }




  //get questions by user id
  getquestionsbyuserid(id:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get(`http://localhost:5000/user/getquestionsbyuserid/${id}`, { headers : headers}  );
  }

    //get questions by user id
    getquestionbyId(id:any) { 
      let headers = new HttpHeaders();
      this.authDataService.loadToken();
      headers.append('Authorization', this.authDataService.authToken );
      headers.append('content-type', 'application/json'); 
  
      return this.http.get(`http://localhost:5000/user/getquestionbyid/${id}`, { headers : headers}  );
    }
  


      //Add user  
  addQuestion( id:any ,data:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

     return this.http.post (`http://localhost:5000/user/newquestion/${id}`,data, { headers : headers}  );
  }

  //get Questions by Tag Name
  getQuestionsbyTagName(title:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get(`http://localhost:5000/user/getquestionbytagname/${title}`, { headers : headers}  );
  }

   //get Tag by Tag Name
   getTagbyTagName(title:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get(`http://localhost:5000/user/gettagbytagname/${title}`, { headers : headers}  );
  }





  // Delete question by id
  deleteQuestion(id:any) {
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.delete(`http://localhost:5000/admin/deletequestion/${id}`, { headers : headers}  ) ; 
  }


//Update user by id 
updateQuestion(id:any, data:any) { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

  return this.http.put(`http://localhost:5000/admin/updatequestion/${id}`,data , { headers : headers} );
}
}
