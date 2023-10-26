import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient) { }
  
  jwtHelperService = new JwtHelperService(); 
  baseUrl: string = 'https://localhost:7169/api/User';

  register(user: string[]) {
    const requestBody = {
      Id: '1',
      Name: user[0],
      Email: user[1],
      Password: user[2],
      CPassword: user[3],
      Role: '0'
    };

    return this.http.post(`${this.baseUrl}/register`, requestBody, { responseType: 'text' });
  }


  login(user:string[]){
    const requestBody = {
      Email: user[0],
      Password: user[1]
    }
    return this.http.post(`${this.baseUrl}/login`, requestBody ,{responseType:'text'})
  }

  setToken(token: string){
    localStorage.setItem("access_token", token)
  }

  loadCurrentUser(){
    const token = localStorage.getItem('access_token')
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null
    return userInfo
  }

  isLoggedIn():boolean{
    return localStorage.getItem("access_token") ? true : false 
  }

  removeToken(){
    localStorage.removeItem("access_token")
  }

  isAdmin() {
    const userInfo = this.loadCurrentUser();
    return userInfo !== null && userInfo.role === "Admin";
  }
}
