import { Customer } from "src/models/customer.model";


export default class CustomerDelete {
    constructor(readonly email : string, readonly customers : Array<Customer>){
                this.email = email
                this.customers = customers
    }

  deleteCustomer(): Array<Customer>{
    const indexToDelete = this.customers.findIndex(customer => customer.email === this.email);
     if (indexToDelete !== -1) {
    this.customers.splice(indexToDelete, 1)
    return this.customers
      }
   return this.customers
  }
}
