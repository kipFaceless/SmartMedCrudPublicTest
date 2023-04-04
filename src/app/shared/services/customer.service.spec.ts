import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: {} }
      ]
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


