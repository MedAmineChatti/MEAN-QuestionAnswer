import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class  HeaderComponent implements OnInit {

  toggled:any=1;
  constructor(
    private authDataService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggel(){ 
    if(this.toggled) {
         (<HTMLInputElement>document.getElementById('sidebar')).style.width = "0";
          this.toggled = 0; 
      } 
      else {
        (<HTMLInputElement>document.getElementById('sidebar')).style.width = "250px"; 
          this.toggled = 1;
      } 
  }
  
  onLogoutClick(){
    this.authDataService.logout();
    this.router.navigate(['/']);
    console.log("You are now logged out")
  }


  
}

