import { Customer } from 'src/models/customer.model';
import CustomerDelete from 'src/app/auxiliar-classes/customer-delete';

describe("deleteCustomer", () => {
  beforeEach(() => {

  });
  it("should delete customer with matching email and return Customers array", () => {

    let customers : Array<Customer> = [
      { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
      { firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
    ];
    const customerCrud = new CustomerDelete("jose@example.com", customers);
    customerCrud.deleteCustomer()
    expect(customerCrud.customers).toEqual([{ firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
  ])

    expect(customers[0].email).toEqual("sebas@example.com");
  });

it("should not delete any customer if email does not match ", () => {

    let customers : Array<Customer> = [
      { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
      { firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
    ];
    const customerCrud = new CustomerDelete("jim.smith@example.com", customers);

     expect(customerCrud.customers).toEqual( [
      { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
      { firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
    ])
    expect(customers[0].email).toEqual("jose@example.com");
    expect(customers[1].email).toEqual("sebas@example.com");
  });
});


