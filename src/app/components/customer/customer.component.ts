import { OnInit, Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './../../shared/services/customer.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Customer } from '../../../models/customer.model';
import { MatDialog, } from '@angular/material/dialog';
import { SharedService } from '../../shared/shared.service';
import googlePhoneNumberValidator  from '../../auxiliar-classes/phone-validator';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Array<Customer> = []
  customerForm = new FormGroup({
  firstName : new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  lastName: new FormControl('',[Validators.required]),
  dateOfBirth :new FormControl('', [Validators.required]),
  phoneNumber :new FormControl('',[Validators.required, googlePhoneNumberValidator, Validators.minLength(9), Validators.min(0)]),
  bankAccountNumber :new FormControl('', [ Validators.required, Validators.minLength(8),  Validators.maxLength(12), Validators.pattern(/^\d+$/), Validators.min(0)]),
}, );


  displayedColumns: string[] = [
    'firstName',
    'dateOfBirth',
    'bankAccountNumber',
    'email',
    'action'
  ];

  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @Input() rowData: any;
   constructor(
    private _dialog : MatDialog,
    private _customerService : CustomerService,
    private _sharedService : SharedService,
       ) {
    this.customers = this._customerService.getDataFromLocalStorage()
    if(this.customers != null) {
    this.dataSource = new MatTableDataSource(this.customers)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
   }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  ngOnInit(): void { }

  submit(){

    if (!this.customerForm.valid) return;
    let customer : Customer = this.customerForm.value
    let {email, dateOfBirth, firstName, lastName} = this.customerForm.value
    let exists = this._customerService.verifyIfEmailExists(email, this.customers )
    let verifyUniqueCustomer = this._customerService.verifyUniqueCustomer(firstName, lastName, dateOfBirth, this.customers)
    if(verifyUniqueCustomer) return this._sharedService.openSnackBar("Customer must be unique!", "Atention")
    if(exists) return this._sharedService.openSnackBar("This email is already taken!", "done")
    let dateOfBirthValidation = this._customerService.dateOfBirthValidation(dateOfBirth)
    if(dateOfBirthValidation) return this._sharedService.openSnackBar("The date of Birth can't be greater than today!", "Atention")
    this.customers.push(customer)
    this._sharedService.openSnackBar("Customer created successfully!", "done")
    localStorage.setItem('customers', JSON.stringify(this.customers) )
    this.customerForm.clearValidators()
    //this.customerForm.reset
    this.dataSource = new MatTableDataSource(this.customers)
       }

  deleteCustomer(email : string){
    this._customerService.deleteCustomer(email, this.customers)
    this.dataSource = new MatTableDataSource(this.customers)
    localStorage.setItem('customers', JSON.stringify(this.customers))
  }

   openEditForm(data : Customer){
 this._dialog.open(EditCustomerComponent , {
    data : data
  })
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
