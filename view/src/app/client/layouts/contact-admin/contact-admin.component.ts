import { Component, OnInit } from '@angular/core';
import{UserService} from '../../../../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import  { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; 
import { Msg } from 'src/app/models/msg';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  data = new Msg();
  constructor(
    private userDataService:UserService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  sendEmail(){
    console.log(this.data);
    this.userDataService.sendEmail(this.data).subscribe((res) =>{
      console.warn(res);
      Swal.fire({
        icon:'success',
        text:'Email sended successfully',
        confirmButtonColor: "#00395D"
      });
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/home/contact']);
       
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
