import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { JwtHelperService } from '@auth0/angular-jwt';


const httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'withCredentials':'true'
    } )
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken:any;
  public user:any;
  public roles:number=0;

  constructor(
    private http : HttpClient,
     ) { }

  saveUser(data: any) {
      return this.http.post('http://localhost:5000/auth/register',data,httpOptions )
  }

  confirmEmail(id: any,token:any) {     
      return this.http.post('http://localhost:5000/auth/verify',{id,token},httpOptions) 
  } 
  
  login(data : any)
  {
     return this.http.post ('http://localhost:5000/auth/login',  data,httpOptions );
  }

  storeUserData(token:any,user:any){

    localStorage.setItem('id_token', token);
    localStorage.setItem('user',JSON.stringify(user));
    sessionStorage.setItem('id_token', token);

    this.authToken = token;
    this.user =user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    sessionStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token'); 
    this.authToken= token;

  }

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }
}
