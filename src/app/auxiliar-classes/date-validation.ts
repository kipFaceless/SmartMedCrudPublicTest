export default class DateOfBirthValidator {
  dateOfBirth : Date
  constructor(dateOfBirth : Date){
              this.dateOfBirth = dateOfBirth
  }
  dateOfBirthValidation() : boolean{
    let today = new Date()
    this.dateOfBirth = new Date(this.dateOfBirth)
    if(this.dateOfBirth  > today )return true
      return false
   }
}
