import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-return-request',
  templateUrl: './return-request.component.html',
  styleUrls: ['./return-request.component.css']
})
export class ReturnRequestComponent {
  rentals : any;
  userId : string;
  isAdmin: boolean = this.authService.isAdmin();

  constructor(
    private rentalService : RentalService,
    private authService : AuthService
    ) { 
    this.userId = this.authService.loadCurrentUser().id;
    this.rentalService.getRentals().subscribe((data) => {
      this.rentals = data;
    });
  }

  returnCar(id: string) {
    this.rentalService.returnResponse(id, true).subscribe((data) => {
      window.location.reload();
    });
  }
}
