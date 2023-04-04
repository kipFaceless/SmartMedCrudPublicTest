import { Injectable } from '@angular/core';
import { Customer } from './../../../models/customer.model';
import { SharedService } from './../shared.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers : Array<Customer> = []
  constructor(
    private _sharedService : SharedService,
    ) {
    let  customers = localStorage.getItem("customers")
    if(customers != null) this.customers = JSON.parse(customers)
  }

  getDataFromLocalStorage() : Array<Customer>{
    let  customers = localStorage.getItem("customers")
     if(customers != null) this.customers = JSON.parse(customers)
     return this.customers
  }

  deleteCustomer(email : string, customers : Array<Customer>){
     const indexToDelete = customers.findIndex(customer => customer.email === email);
      if (indexToDelete !== -1) {
     let result = customers.splice(indexToDelete, 1)
         this._sharedService.openSnackBar("Customer deleted successfully!", "Done")
         return result
      }
    return []
   }

   verifyIfEmailExists(email: string, customers: Array<Customer>): boolean {
     const findIfEmailExists = customers.some(custom => custom.email === email);
     return findIfEmailExists;
   }

   dateOfBirthValidation(dateOfBirth : Date) : boolean{
    let today = new Date()
    dateOfBirth = new Date(dateOfBirth)
    if(dateOfBirth  > today )return true
      return false
   }

   verifyUniqueCustomer(firstName : string, lastName : string, dateOfBirth : Date, customers : Array<Customer>) : boolean{
    let verifyUniqueCustomer =  customers.find(custom => {
      return custom.firstName === firstName && custom.dateOfBirth === dateOfBirth && custom.lastName === lastName
    })
    if(verifyUniqueCustomer) return true
    return false
   }


}
