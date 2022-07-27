import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import{AuthService} from '../../../services/auth.service';
import { EmailToken } from 'src/app/models/email-token';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-validation-email',
    templateUrl: './validation-email.component.html',
    styleUrls: ['./validation-email.component.css']
})
export class ValidationEmailComponent implements OnInit {
     
    userId:any;
    emailToken:any;
    
    data= new EmailToken( );

    constructor(
        private route: ActivatedRoute,
        private authDataService: AuthService,
        private router: Router

    ){}
  
    ngOnInit(): void {
        this.data.userId = this.route.snapshot.paramMap.get('id');
        this.data.token = this.route.snapshot.paramMap.get('emailToken'); 
        console.log(this.data);
     }

    confirm(){
        
      console.log(this.data);
        this.authDataService.confirmEmail(this.data.userId,this.data.token).subscribe((res) =>{
            console.log(res);   
      
              Swal.fire({
                icon:'success',
                text: 'Email verified successfully.',
                confirmButtonColor: "#00395D"
              }).then(() => this.router.navigate(['/']) 
              );

        },(err:HttpErrorResponse) =>{
            console.log(err.error.msg);  
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.msg,
                confirmButtonColor: "#00395D"
              })
        })
    }
 }