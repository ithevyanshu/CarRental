import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css'],
})
export class RentalFormComponent {
  displayMsg: string = '';
  id: string;
  car: any = {};
  rental: any = [];
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
      this.carService.getCar(this.id).subscribe((data) => {
        this.car = data;
      });
      rentalService.getRentals().subscribe((data) => {
        this.rental = data;
        this.rental = this.rental.filter((rental) => rental.carId == this.id);
        // console.log(this.rental);
      });
    });
  }

  rentalAgreement = new FormGroup(
    {
      startDate: new FormControl('', [
        Validators.required,
        this.dateInPastValidator(),
      ]),
      endDate: new FormControl('', [
        Validators.required,
        this.dateInPastValidator(),
      ]),
    },
    {
      validators: [this.endDateValidator(), this.alreadyRentedValidator()],
    }
  );

  onSubmit(value) {
    if (value) {
      this.displayMsg = '*All fields required';
    } else {
      this.rentalService
        .addRental([
          this.car.id,
          this.username.id,
          this.rentalAgreement.value.startDate,
          this.rentalAgreement.value.endDate,
        ])
        .subscribe((res) => {
          this.router.navigate(['']);
        });
    }
  }

  getRentalDuration(): number {
    const startDate = new Date(this.rentalAgreement.value.startDate);
    const endDate = new Date(this.rentalAgreement.value.endDate);
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const rentalDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return rentalDuration + 1;
  }

  dateInPastValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = new Date(control.value);
      if (selectedDate < currentDate) {
        return { dateInPast: true };
      }
      return null;
    };
  }

  endDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startDate = control.get('startDate').value;
      const endDate = control.get('endDate').value;
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        return { endDateBeforeStartDate: true };
      }
      return null;
    };
  }

  alreadyRentedValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedStartDate = new Date(control.get('startDate').value);
      const selectedEndDate = new Date(control.get('endDate').value);

      let rentalDates = [];

      for (const rental of this.rental) {
        const rentalStartDate = new Date(rental.startDate);
        const rentalEndDate = new Date(rental.endDate);
        for (
          let currentDate = rentalStartDate;
          currentDate <= rentalEndDate;
          currentDate.setDate(currentDate.getDate() + 1)
        ) {
          if (rental.returnResp) {
            continue;
          }
          console.log(rental.returnResp, currentDate);
          rentalDates.push(new Date(currentDate));
        }
      }

      for (const rentalDate of rentalDates) {
        if (rentalDate >= selectedStartDate && rentalDate <= selectedEndDate) {
          return { alreadyRented: true };
        }
      }

      return null;
    };
  }

  get StartDate(): FormControl {
    return this.rentalAgreement.get('startDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.rentalAgreement.get('endDate') as FormControl;
  }
}
