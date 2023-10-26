import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAdmin(){
    if(this.isUserActive && this.authService.isAdmin()){
      return true
    }
    return false
  }
  
  currentUser(){
    return this.authService.loadCurrentUser().name;
  }

  constructor(private authService : AuthService, private router : Router){}

  get isUserActive(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.removeToken()
    this.router.navigate([''])
  }
}
