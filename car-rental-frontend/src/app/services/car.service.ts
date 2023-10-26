import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:7169/api/Car';

  addCar(car: string[]) {
    const requestBody = {
      Id: "",
      Maker: car[0],
      Model: car[1],
      Price: car[2],
      ImageUrl: car[3],
      Status: "Yes"
    };
    console.log(requestBody);
    
    return this.http.post(`${this.baseUrl}/add-car`, requestBody, {
      responseType: 'text',
    });
  }

  getCars() {
    return this.http.get(`${this.baseUrl}/get-all-cars`);
  }

  getCar(id: string) {
    return this.http.get(`${this.baseUrl}/get-car/${id}`);
  }

  updateCar(Id:string, car: string[]) {
    const requestBody = {
      Id: Id,
      Maker: car[0],
      Model: car[1],
      Price: car[2],
      ImageUrl: car[3],
    };
    return this.http.put(`${this.baseUrl}/update-car/${Id}`, requestBody, {
      responseType: 'text',
    });
  }

  deleteCar(id: string) {
    console.log(id);
    return this.http.delete(`${this.baseUrl}/delete-car/${id}`, {
      responseType: 'text',
    });
  }

}
