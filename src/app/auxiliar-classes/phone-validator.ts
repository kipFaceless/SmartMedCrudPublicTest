  import { ValidationErrors, AbstractControl } from '@angular/forms';
  import { PhoneNumberUtil } from 'google-libphonenumber';

  export default function  googlePhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const phoneNumber = control.value;
  const regionCode = 'PT';
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber, regionCode);
    if (!phoneUtil.isValidNumber(parsedNumber))  return { invalidPhoneNumber: true };
  } catch (e) {
    return { invalidPhoneNumber: true };
  }
  return null;
}
