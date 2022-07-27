import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserDialogComponent } from 'src/app/components/utils/dialogs/edit-user-dialog/edit-user-dialog.component';
import { AdduserDialogComponent } from 'src/app/components/utils/dialogs/adduser-dialog/adduser-dialog.component';
 @Component({
    selector: 'app-user-mangment',
    templateUrl: './user-mangment.component.html',
    styleUrls: ['./user-mangment.component.css']
})

export class UserMangmentComponent implements OnInit { 
    countTableRows:number=0;
    p:number = 1;
    firstName:any;
    users :any = [];
    constructor(
        private userDataService: UserService,
        public dialog: MatDialog) 
        { } 

    ngOnInit(): void {
        this.readUsers(); 
    }
 
    readUsers() {
        this.userDataService.getAllUsers().subscribe((res) => {
            this.users = res; 
        });
    }
 
    removeUser( id:any) {   
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) { 
                this.userDataService.deleteUser(id).subscribe((res) => {  
                    Swal.fire( {
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success'          
                    })
                    .then(()=>{
                        this.readUsers();
                    })
                })  
            } 
        }) 
    } 

    Search(){
        if(this.firstName==''){
            this.ngOnInit();
        }
        else { 
            this.users = this.users.filter((res: { firstName: string; } ) =>{  
                if (res.firstName !== "") { 
                    return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()); 
                } 
                else {  
                    return this.ngOnInit();
                }        
            })
        }
    }
  
   
 
    openAddUserDialog()  {
        this.dialog.open(AdduserDialogComponent, {
            
        });
      }

      openEditUserDialog( userId : any)  {
        this.dialog.open(EditUserDialogComponent, { 
            data: { 
            userId: userId
          },
        });
      }
}