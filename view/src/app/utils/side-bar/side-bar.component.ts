import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../../services/auth.service';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
    toggled:any=1;

   constructor(
    private authDataService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authDataService.logout();
    this.router.navigate(['/']);
    console.log("You are now logged out")
  }

   
 
}
 
