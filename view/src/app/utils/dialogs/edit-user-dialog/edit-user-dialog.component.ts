import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UserMangmentComponent } from '../../../admin/layouts/user-mangment/user-mangment.component';
@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  user :any = [];
  
  userId:any;
    
  constructor(
     private userDataService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef <UserMangmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    this.userId = this.data.userId;
    console.log(this.userId);
    this.userDataService.getUser(this.userId).subscribe((res) => {
      this.user=res;
  });
  }



  updateUser(){
    console.log(this.user);
 

      console.log(this.user);
      this.userDataService.updateUser(this.userId,this.user).subscribe((res) =>{
        console.warn(res);
        Swal.fire({
          icon:'success',
          text:'Update  success',
          confirmButtonColor: "#00395D"
        }).then(()=>{
            this.dialogRef.close(false); 
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/dashboard/usermangment']);
        }) 
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
