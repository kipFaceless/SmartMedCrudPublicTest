import { Component, OnInit, Inject, Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../../models/customer.model';
import { MatDialog, } from '@angular/material/dialog';
import { SharedService } from '../../../shared/shared.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import googlePhoneNumberValidator  from '../../../auxiliar-classes/phone-validator';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customers: Array<Customer> = []
  customerForm = new FormGroup({
    firstName : new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    lastName: new FormControl('',[Validators.required]),
    dateOfBirth :new FormControl('', [Validators.required]),
    phoneNumber :new FormControl('',[Validators.required, googlePhoneNumberValidator, Validators.minLength(9), Validators.min(0)]),
    bankAccountNumber :new FormControl('', [ Validators.required, Validators.minLength(8),  Validators.maxLength(12), Validators.pattern(/^\d+$/), Validators.min(0)]),
  }, );

@Input() rowData: any;
constructor(
  private _dialog : MatDialog,
  private _sharedService : SharedService,
  private _customerService : CustomerService,
  @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    this.customers = this._customerService.getDataFromLocalStorage()
    }

ngOnInit(): void {
}


updateCustomer(){
  if (!this.customerForm.valid) return;
  let customer : Customer = this.customerForm.value
  let {email, dateOfBirth } = this.customerForm.value
  let dateOfBirthValidation = this._customerService.dateOfBirthValidation(dateOfBirth)
  if(dateOfBirthValidation) return this._sharedService.openSnackBar("The date of Birth can't be greater than today!", "Atention")
  const finCustomerIndex= this.customers.findIndex(customer => customer.email === email);
  this.customers[finCustomerIndex] = customer
  localStorage.setItem('customers', JSON.stringify(this.customers) )
  this._sharedService.openSnackBar("Customer Updated successfully!", "done")
  this._dialog.closeAll()
  }

cancelForm(){
  this._dialog.closeAll()
}

get email() {
  return this.customerForm.get('email');
}
get firstName() {
  return this.customerForm.get('firstName');
}
get dateOfBirth() {
  return this.customerForm.get('dateOfBirth');
}
get lastName() {
  return this.customerForm.get('lastName');
}
get phoneNumber() {
  return this.customerForm.get('phoneNumber');
}
get bankAccountNumber() {
  return this.customerForm.get('bankAccountNumber');
}

}

