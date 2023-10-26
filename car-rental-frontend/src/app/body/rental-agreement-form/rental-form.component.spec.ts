import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalFormComponent } from './rental-form.component';

describe('RentalFormComponent', () => {
  let component: RentalFormComponent;
  let fixture: ComponentFixture<RentalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalFormComponent]
    });
    fixture = TestBed.createComponent(RentalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
