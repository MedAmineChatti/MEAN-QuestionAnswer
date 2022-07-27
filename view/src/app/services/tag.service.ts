import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    public http : HttpClient,
    public authDataService: AuthService
  ) { }


   //Add tag  
   addTag(  data:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json');  
    return this.http.post ('http://localhost:5000/admin/addtag',data , { headers : headers}  );
  }


 //Get all tags 
 getAllTags() { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json');  
  return this.http.get('http://localhost:5000/admin/getalltags', { headers : headers} );
}



 //Get tag by id
 getTagById(id:any) { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json');  
  return this.http.get(`http://localhost:5000/admin/gettagbyid/${id}`, { headers : headers}  );
}







//Update user by id 
updateTagById(id:any, data:any) { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

  return this.http.put(`http://localhost:5000/admin/updatetagbyid/${id}`,data , { headers : headers} );
}





 // Delete tag by id
 deleteTag(id:any) {
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

  return this.http.delete(`http://localhost:5000/admin/deletetag/${id}`, { headers : headers}  ) ; 
}








}
