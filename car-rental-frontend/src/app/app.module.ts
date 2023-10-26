import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AddCarComponent } from './body/add-car/add-car.component';
import { RentalAgreementComponent } from './body/all-rental-agreements/rental-agreement.component';
import { RentalFormComponent } from './body/rental-agreement-form/rental-form.component';
import { HelpComponent } from './body/help/help.component';
import { ReturnRequestComponent } from './body/return-request/return-request.component';
import { CarDetailsComponent } from './body/car-details/car-details.component';
import { EditCarComponent } from './body/edit-car/edit-car.component';
import { EditRentalAgreementComponent } from './body/edit-rental-agreement/edit-rental-agreement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    AddCarComponent,
    RentalAgreementComponent,
    RentalFormComponent,
    HelpComponent,
    ReturnRequestComponent,
    CarDetailsComponent,
    EditCarComponent,
    EditRentalAgreementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
