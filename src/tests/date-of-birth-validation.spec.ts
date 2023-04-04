import DateOfBirthValidator from "src/app/auxiliar-classes/date-validation";

describe("dateOfBirthValidation", () => {
  it("should return true if date of birth is in the future", () => {
    const today = new Date();
    const futureDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const dateClass = new DateOfBirthValidator(futureDate);

    const result = dateClass.dateOfBirthValidation();

    expect(result).toEqual(true);
  });

  it("should return false if date of birth is not in the future", () => {

    const today = new Date();
    const pastDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const dateClass = new DateOfBirthValidator(pastDate);
    const result = dateClass.dateOfBirthValidation();

    expect(result).toEqual(false);
  });
});


