
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedOption: string;
  cars: any = []
  customCar:any
  count: number
  isloggedIn: boolean = this.authService.isLoggedIn();

  constructor(
    private authService: AuthService, 
    private carService: CarService,
    private router: Router,
  ) {
    carService.getCars().subscribe((data) => {
      this.cars = data
      this.customCar = this.cars
      this.count = this.customCar.length      
    })
  }

  searchCar = new FormGroup({
    maker: new FormControl(""),
    model: new FormControl(""),
    minPrice: new FormControl(""),
    maxPrice: new FormControl("")
  })

  isEmpty(){
    return this.count==0
  }
  
  isAdmin() {
    if (this.isUserActive && this.authService.isAdmin()) {
      return true
    }
    return false
  }
  
  get isUserActive(): boolean {
    return this.authService.isLoggedIn();
  }
  
  delete(Id: string) {
    this.carService.deleteCar(Id).subscribe((data) => {
      window.location.reload();
    });
  }  
  
  update(Id: string) {
    this.router.navigate([`admin/edit-car/${Id}`])
  }
  
  bookCar(id : string){
    this.router.navigate(['dashboard/car-details/'+id])
  }

  search(data: any) {
    this.customCar = this.cars.filter((car: any) => {
      return car.maker.toLowerCase() === (data.maker ? data.maker.toLowerCase() : car.maker.toLowerCase()) &&
             car.model.toLowerCase() === (data.model ? data.model.toLowerCase() : car.model.toLowerCase()) &&
             (data.minPrice ? car.price >= data.minPrice : true) &&
             (data.maxPrice ? car.price <= data.maxPrice : true);
    });
    console.log(this.customCar);
    this.count = this.customCar.length
  }
}
