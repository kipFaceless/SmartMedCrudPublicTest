import ExistingEmailVerifiction from "src/app/auxiliar-classes/email-verification";
import { Customer } from "src/models/customer.model";


describe("verify If Email Exists in database", () => {
  it("should return true if email exists in customers array", () => {

    let customers : Array<Customer> = [
      { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
      { firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
    ];

    let email : string = "jose@example.com"
    const emailClass = new ExistingEmailVerifiction(email, customers);
     const result = emailClass.verifyIfEmailExists();
    expect(result).toEqual(true);
  });

  it("should return false if email does not exist in customers array", () => {
    let email : string = "test@example.com"
    let customers : Array<Customer> = [
      { firstName: "Jose", lastName :"Bob", email: "jose@example.com", dateOfBirth :  new Date("2021-07-10T23:00:00"), phoneNumber: "+351-937-509-736", bankAccountNumber : 22232},
      { firstName: "Sebas", lastName : "Costa", email: "sebas@example.com", dateOfBirth :  new Date("1988-07-10T23:00:00"), phoneNumber: "+351-926-800-536", bankAccountNumber : 76232}
    ];
    const emailClass = new ExistingEmailVerifiction(email, customers);
    let result = emailClass.verifyIfEmailExists();

    expect(result).toEqual(false);
  });
});

