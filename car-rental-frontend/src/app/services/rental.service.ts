import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http : HttpClient) { }

  baseUrl: string = 'https://localhost:7169/api/Rental';

  addRental(rental: string[]) {
    const requestBody = {
      Id: "",
      CarId: rental[0],
      UserId: rental[1],
      StartDate: rental[2],
      EndDate: rental[3],
      RentalDuration: this.getDaysDifference(rental[2], rental[3]),
      ReturnReq: false,
      ReturnResp: false,
    };
    console.log(requestBody);
    return this.http.post(`${this.baseUrl}/add-agreement`, requestBody, {
      responseType: 'text',
    });
  }

  getRentals() {
    return this.http.get(`${this.baseUrl}/get-all-agreement`);
  }

  getRental(id: string) {
    return this.http.get(`${this.baseUrl}/get-agreement/${id}`);
  }

  returnRequest(Id:string, request:boolean){
    return this.http.patch(`${this.baseUrl}/return-request/${Id}?request=${request}`, {
      responseType: 'text',
    });
  }

  returnResponse(Id:string, request:boolean){
    return this.http.patch(`${this.baseUrl}/return-response/${Id}?response=${request}`, {
      responseType: 'text',
    });
  }

  updateRental(Id:string, rental: string[]) {
    return this.http.put(`${this.baseUrl}/update-agreement/${Id}?startDate=${rental[0]}&endDate=${rental[1]}`, {
      responseType: 'text',
    });
  }

  deleteRental(id: string) {
    return this.http.delete(`${this.baseUrl}/delete-agreement/${id}`, {
      responseType: 'text',
    });
  }

  getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    if(timeDifference <= 0){
      return 1;
    }
    else{
      return Math.floor(timeDifference / (1000 * 3600 * 24));
    }
  }
}
