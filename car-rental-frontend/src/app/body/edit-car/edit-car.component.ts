import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {
  displayMsg: string = "";
  isCarAdded: boolean = false;
  carId: any = "";
  car: any = {};
  constructor(private carService: CarService, private router: Router, private route : ActivatedRoute) {
    route.params.subscribe((params) => {
      this.carId = params['id'];
      carService.getCar(this.carId).subscribe((data) => {
        this.car = data;
        console.log(this.car);
        this.addCar.patchValue({
          manufacturer: this.car.maker,
          model: this.car.model,
          price: this.car.price,
          image: this.car.imageUrl
        })
      })
   });
  }

  addCar = new FormGroup({
    manufacturer: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    model: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    price: new FormControl("d", [Validators.required]),
    image: new FormControl(this.carId, [Validators.required])
  })

  onSubmit(value) {
    if(value){
      this.displayMsg = "*All fields required"
    }
    else {
      this.carService.updateCar(
        this.carId,
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
