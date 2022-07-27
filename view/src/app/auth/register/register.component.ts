import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../../services/auth.service';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
 
export class RegisterComponent implements OnInit {

    newUser = new User();
  
   

    constructor(
        private authDataService: AuthService,
        private router: Router
    ){}
    
    ngOnInit(): void {
       
    }


 

    registerNewUser(){
 

            console.log(this.newUser);
            this.authDataService.saveUser(this.newUser).subscribe((res) =>{
              console.warn(res);
              Swal.fire({
                icon:'success',
                text:'Signup success, You need to verify your email',
                confirmButtonColor: "#00395D"
              });
               this.router.routeReuseStrategy.shouldReuseRoute = () => false;
               this.router.onSameUrlNavigation = 'reload';
               this.router.navigate(['/register']);
               
            },(err:HttpErrorResponse) =>{
    
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.error.msg,
                    confirmButtonColor: "#00395D"
                  })
            })
            
        
    
    }
}