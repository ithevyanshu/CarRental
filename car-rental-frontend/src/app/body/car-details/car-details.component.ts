import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car : any = {};
  rentals: any = [];
  id = this.route.snapshot.params['id'];
  isloggedIn: boolean = this.authService.isLoggedIn();
  currentDate = new Date().toISOString();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private authService: AuthService,
    private carService : CarService
  ) {
    // console.log(this.currentDate);
    carService.getCar(this.id).subscribe((data) => {
      this.car = data;
    })
    rentalService.getRentals().subscribe((data) => {
      this.rentals = data
      this.rentals = this.rentals.filter((rental) => rental.carId == this.id);
    });
  }

  bookCar(carId: any) {
    this.router.navigate(['user/rental-agreement/', carId]);
  }
}
