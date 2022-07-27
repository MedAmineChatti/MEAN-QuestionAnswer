import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
 
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http : HttpClient,
    public authDataService: AuthService
    ) { }

  //Get all users 
  getAllUsers() { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get('http://localhost:5000/admin/getallusers', { headers : headers} );
  }

  // Delete user by id
  deleteUser(id:any) {
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.delete(`http://localhost:5000/admin/deleteuser/${id}`, { headers : headers}  ) ; 
  }

  //Get user by id
  getUser(id:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.get(`http://localhost:5000/admin/getUser/${id}`, { headers : headers}  );
  }

  //Update user by id 
  updateUser(id:any, data:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

    return this.http.put(`http://localhost:5000/admin/updateuser/${id}`,data , { headers : headers} );
  }

  //Add user  
  addUser(  data:any) { 
    let headers = new HttpHeaders();
    this.authDataService.loadToken();
    headers.append('Authorization', this.authDataService.authToken );
    headers.append('content-type', 'application/json'); 

     return this.http.post ('http://localhost:5000/admin/adduser',data , { headers : headers}  );
  }




 //send email  
 sendEmail(  data:any) { 
  let headers = new HttpHeaders();
  this.authDataService.loadToken();
  headers.append('Authorization', this.authDataService.authToken );
  headers.append('content-type', 'application/json'); 

   return this.http.post ('http://localhost:5000/user/sendemailtoadmin',data , { headers : headers}  );
}
 
 
}


