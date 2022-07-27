import { Component, OnInit } from '@angular/core';
import{UserService} from '../../../../services/user.service';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import  { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {  MatDialogRef} from '@angular/material/dialog';
import { UserMangmentComponent } from '../../../admin/layouts/user-mangment/user-mangment.component';

@Component({
  selector: 'app-adduser-dialog',
  templateUrl: './adduser-dialog.component.html',
  styleUrls: ['./adduser-dialog.component.css']
})
export class AdduserDialogComponent implements OnInit {
  newUser = new User();
  
  

    constructor(
        private userDataService: UserService,
        private router: Router,
        private dialogRef: MatDialogRef <UserMangmentComponent>
    ){}
    

  ngOnInit(): void {
  }



 

  addUser(){

  

        console.log( 'FIRST : '+this.newUser);
        this.userDataService.addUser(this.newUser).subscribe((res) =>{
          console.warn(res);
          Swal.fire({
            icon:'success',
            text:'User added successfully',
            confirmButtonColor: "#00395D"
          }).then(()=>{ 
          this.dialogRef.close(false);

           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
           this.router.onSameUrlNavigation = 'reload';
           this.router.navigate(['/dashboard/usermangment']);
          } )  
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
