import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RentalAgreementComponent } from './body/all-rental-agreements/rental-agreement.component';
import { RentalFormComponent } from './body/rental-agreement-form/rental-form.component';
import { AddCarComponent } from './body/add-car/add-car.component';
import { HelpComponent } from './body/help/help.component';
import { ReturnRequestComponent } from './body/return-request/return-request.component';
import { CarDetailsComponent } from './body/car-details/car-details.component';
import { adminGuard } from './services/admin.guard';
import { authGuard } from './services/auth.guard';
import { EditCarComponent } from './body/edit-car/edit-car.component';
import { EditRentalAgreementComponent } from './body/edit-rental-agreement/edit-rental-agreement.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: "full"
  },
  {
    path:'dashboard/car-details/:id',
    component:CarDetailsComponent
  },
  {
    path:'auth/login',
    component:LoginComponent
  },
  {
    path:'auth/signup',
    component:SignupComponent
  },
  {
    path:'admin/add-car',
    component:AddCarComponent,
    canActivate: [adminGuard]
  },
  {
    path:'admin/edit-car/:id',
    component:EditCarComponent,
    canActivate: [adminGuard]
  },
  {
    path:'admin/return-requests',
    component:ReturnRequestComponent,
    canActivate: [adminGuard]
  },
  {
    path:'admin/edit-rental-agreement/:id',
    component:EditRentalAgreementComponent,
    canActivate: [adminGuard]
  },
  {
    path:'user/rental-agreement/:id',
    component:RentalFormComponent,
    canActivate: [authGuard]
  },
  {
    path:'dashboard/rental-agreements',
    component:RentalAgreementComponent,
    canActivate: [authGuard]
  },
  {
    path:'dashboard/help',
    component:HelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
