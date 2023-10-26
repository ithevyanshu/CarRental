import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-edit-rental-agreement',
  templateUrl: './edit-rental-agreement.component.html',
  styleUrls: ['./edit-rental-agreement.component.css']
})
export class EditRentalAgreementComponent {
  displayMsg: string = '';
  id: string;
  rental: any = {};
  carId: any = '';
  car: any = {};
  username: any = this.authService.loadCurrentUser();

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private authService: AuthService,
    private rentalService: RentalService
  ) {
    route.params.subscribe((params) => {
      this.id = params['id'];
      rentalService.getRental(this.id).subscribe((data) => {
        this.rental = data;
        this.carId = this.rental.carId;
        this.carService.getCar(this.carId).subscribe((data)=>{
          this.car = data;
        });
        
      })
    });
  }

  rentalAgreement = new FormGroup(
    {
      startDate: new FormControl("", Validators.required),
      endDate: new FormControl("", Validators.required),
    }
  );

  onSubmit(value) {
    if (value) {
      this.displayMsg = '*All fields required';
    } else {
      this.rentalService.updateRental(this.id, [this.rentalAgreement.value.startDate, this.rentalAgreement.value.endDate])
        .subscribe((res) => {
          this.router.navigate(['dashboard/rental-agreements']);
        });
    }
  }
  

  getRentalDuration(): number {
    const startDate = new Date(this.rentalAgreement.value.startDate);
    const endDate = new Date(this.rentalAgreement.value.endDate);
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const rentalDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return rentalDuration+1;
  }

  get StartDate(): FormControl {
    return this.rentalAgreement.get('startDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.rentalAgreement.get('endDate') as FormControl;
  }
}

