import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }
    else if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      this.router.navigate(['dashboard']);
      return false;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
};
