import { Customer } from 'src/models/customer.model';
import CustomerClass from '../app/auxiliar-classes/auxiliar-classes'

describe("verify Unique Customer", () =>{
  beforeEach(() => {
     });

    it("Should return false if customer with same first name, last name, and date of birth does not exist", () =>{
      let firstName = "virgul"
      let lastName = "Bieber"
      let dateOfBirth = new Date("2021-07-10T23:00:00")

      let customers : Array<Customer> = [
        { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
        { firstName: "Sebas", lastName :"Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
      ]
      const auxiliarClass = new CustomerClass(firstName, lastName, dateOfBirth, customers);
      const result  = auxiliarClass.verifyUniqueCustomer();
      expect(result).toBe(false);
    })
});
