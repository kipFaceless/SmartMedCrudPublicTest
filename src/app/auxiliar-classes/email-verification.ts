import { Customer } from "src/models/customer.model";
export default class ExistingEmailVerifiction{
  email : string
  customers: Array<Customer>
  constructor (email: string, customers: Array<Customer>){
              this.email = email
              this.customers = customers

  }
  verifyIfEmailExists(): boolean {
    const findIfEmailExists = this.customers.some(custom => custom.email === this.email);
    return findIfEmailExists;
  }
}
