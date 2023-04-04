import { Customer } from './../../models/customer.model';


export default class CustomerClass{
constructor(readonly firstName : string, readonly lastName : string, readonly dateOfBirth: Date, readonly customers : Array<Customer>){
    this.firstName = firstName
    this.dateOfBirth = dateOfBirth
    this.customers = customers
    this.lastName = lastName
}

verifyUniqueCustomer(): boolean {
  return this.customers.some(custom =>
    custom.firstName === this.firstName &&
    custom.dateOfBirth === this.dateOfBirth &&
    custom.lastName === this.lastName
  );
}


}



