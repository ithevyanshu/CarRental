import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-agreement',
  templateUrl: './rental-agreement.component.html',
  styleUrls: ['./rental-agreement.component.css'],
})
export class RentalAgreementComponent {
  rentals: any;
  userId: string;
  isAdmin: boolean = this.authService.isAdmin();
  constructor(
    private rentalService: RentalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.loadCurrentUser().id;
    this.rentalService.getRentals().subscribe((data) => {
      this.rentals = data;
    });
  }
  
  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  }

  returnCar(id: string) {
    this.rentalService.returnRequest(id, true).subscribe((data) => {
      window.location.reload();
    });
  }

  updateAgreement(id: string) {
    this.router.navigate([`admin/edit-rental-agreement/${id}`]);
  }

  deleteAgreement(id: string) {
    this.rentalService.deleteRental(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
