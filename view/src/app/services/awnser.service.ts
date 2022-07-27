import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AwnserService {

  constructor( 
    public http : HttpClient,
    public authDataService: AuthService
  ) { }


     //get questions by user id
     getAwnsersByQuestionId (id:any) { 
      let headers = new HttpHeaders();
      this.authDataService.loadToken();
      headers.append('Authorization', this.authDataService.authToken );
      headers.append('content-type', 'application/json'); 
  
      return this.http.get(`http://localhost:5000/user/getawnserbyquestionid/${id}`, { headers : headers}  );
    }


    getAllAnswer(){ 
      let headers = new HttpHeaders();
      this.authDataService.loadToken();
      headers.append('Authorization', this.authDataService.authToken );
      headers.append('content-type', 'application/json'); 
  
      return this.http.get(`http://localhost:5000/admin/getallanswers`, { headers : headers}  );
    }

    deleteAnswerById(id:any){
      let headers = new HttpHeaders();
      this.authDataService.loadToken();
      headers.append('Authorization', this.authDataService.authToken );
      headers.append('content-type', 'application/json'); 
  
      return this.http.delete(`http://localhost:5000/admin/deleteanswerbyid/${id}`, { headers : headers}  );
   
    }



    //Update user by id 
updateAnswer(id:any, data:any) { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

  return this.http.put(`http://localhost:5000/admin/updateanswer/${id}`,data , { headers : headers} );
}




getAnswerById(id:any){ 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

  return this.http.get(`http://localhost:5000/admin/getanswerbyid/${id}`, { headers:headers}  );
}



 //Add user  
 addAnswer( id:any ,data:any) { 
        let headers = new HttpHeaders();
        this.authDataService.loadToken();
        headers.append('Authorization', this.authDataService.authToken );
        headers.append('content-type', 'application/json'); 
    
         return this.http.post (`http://localhost:5000/user/addanswer/${id}`,data, { headers : headers}  );
      }
      addOneRaitingAnswer(id:any) { 
        let headers = new HttpHeaders();
        this.authDataService.loadToken();
        headers.append('Authorization', this.authDataService.authToken );
        headers.append('content-type', 'application/json'); 
    
         return this.http.put(`http://localhost:5000/user/add/rating/${id}` , { headers : headers}  );
      }
      subtractOneRaitingAnswer(id:any) { 
        let headers = new HttpHeaders();
        this.authDataService.loadToken();
        headers.append('Authorization', this.authDataService.authToken );
        headers.append('content-type', 'application/json'); 
    
         return this.http.put(`http://localhost:5000/user/subtract/rating/${id}`, { headers : headers}  );
      }
}
