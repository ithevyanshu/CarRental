import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  repeatPass: string = 'none';
  displayMsg: string = "";
  isAccountCreated: boolean = false
  constructor(private authService: AuthService, private router: Router) { }

  register = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    pass: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    cpass: new FormControl("")
  })

  onSubmit(value) {
    if(value){
      this.displayMsg = "*All fields required"
    }
    else if (this.Pass.value == this.CPass.value) {
      this.authService.register(
        [
          this.register.value.name,
          this.register.value.email,
          this.register.value.pass,
          this.register.value.cpass
        ]
      )
        .subscribe((res) => {
          if (res == "Success") {
            this.displayMsg = "Account Created Sucessfully"
            this.isAccountCreated = true
            this.router.navigate(["auth/login"])
          } else if (res == "Email already exists") {
            this.displayMsg = "Account already exists. Try Another Email"
            this.isAccountCreated = false
          } else {
            this.displayMsg = "Something went wrong"
            this.isAccountCreated = false
          }
          console.log(res);
        })
    }
    else {
      this.repeatPass = 'inline'
    }
  }

  get Name(): FormControl {
    return this.register.get("name") as FormControl;
  }
  get Email(): FormControl {
    return this.register.get("email") as FormControl;
  }
  get Pass(): FormControl {
    return this.register.get("pass") as FormControl;
  }
  get CPass(): FormControl {
    return this.register.get("cpass") as FormControl;
  }
}
