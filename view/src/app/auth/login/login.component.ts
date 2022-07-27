import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../../services/auth.service';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   userDetails = new User();  
   role:any;
   data:any;
  constructor(
        private authDataService: AuthService,
        private router: Router
  ) { }
  
  ngOnInit(): void {
    this.data = localStorage.getItem('user'); 
    this.role = JSON.parse(this.data.role);
    console.log(this.data.role); 
  }
   
  login(){
    this.authDataService.login(this.userDetails).subscribe((res:any)=> {
         
      console.log(res);
      this.authDataService.storeUserData(res.accesstoken,res.user);
      
      if (res.user.role == 0) {
         
        this.router.navigate(['/home']);

      }else{

        this.router.navigate(['/dashboard']);

      }
                  
    },(err:HttpErrorResponse) =>{
      console.log(err);  
     
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
            confirmButtonColor: "#00395D"
          })
         
  })
  }
}
