import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import{AuthService} from '../services/auth.service';
import  { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
   
   user: any;
  role: any;
  data: any;
  constructor(
    private auth: AuthService,
    private router: Router

    ){}
    
  canActivate() {
      if (this.auth.loggedIn()) {

        this.data = localStorage.getItem('user');
        this.data = JSON.parse(this.data)
        this.role = JSON.parse(this.data.role);

        if (this.role==1) {
          this.router.navigate(['dashboard']); 
        } else {
          this.router.navigate(['home']);  
        }
        return false; 

      } else { 
         return true;  
      }
  }

}
