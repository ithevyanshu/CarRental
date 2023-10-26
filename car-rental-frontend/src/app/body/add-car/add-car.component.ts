import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  displayMsg: string = "";
  isCarAdded: boolean = false
  constructor(private carService: CarService, private router: Router) { }

  addCar = new FormGroup({
    manufacturer: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    model: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    price: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required])
  })

  onSubmit(value) {
    if(value){
      this.displayMsg = "*All fields required"
    }
    else {
      this.carService.addCar(
        [
          this.addCar.value.manufacturer,
          this.addCar.value.model,
          this.addCar.value.price,
          this.addCar.value.image
        ]
      )
        .subscribe((res) => {
          console.log(res);
          this.router.navigate([""]);
        })
    }
  }

  get Manufacturer(): FormControl {
    return this.addCar.get("manufacturer") as FormControl;
  }
  get Model(): FormControl {
    return this.addCar.get("model") as FormControl;
  }
  get Price(): FormControl {
    return this.addCar.get("price") as FormControl;
  }
  get Image(): FormControl {
    return this.addCar.get("image") as FormControl;
  }
}
