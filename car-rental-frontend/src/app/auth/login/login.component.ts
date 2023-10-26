import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn : boolean = false
  displayMsg : string = ""

  currentuser(){
    return this.loginAuth.loadCurrentUser()
  }

  constructor(private loginAuth : AuthService, private router : Router){}
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required])
  })
  
  login(value){
    if(value){
      this.displayMsg = "*All fields required"
    }
    else{
      this.loginAuth.login([this.loginForm.value.email,this.loginForm.value.password])
      .subscribe((res=>{
        if(res == "Failure"){
          this.isLoggedIn = false
          this.displayMsg = "*Incorrect email or password"
        }
        else{
          this.loginAuth.setToken(res)
          this.router.navigate([""])
        }
      }))
    }   
  }

  get Email() : FormControl{
    return this.loginForm.get('email') as FormControl
  }
  get Password() : FormControl{
    return this.loginForm.get('password') as FormControl
  }
}
