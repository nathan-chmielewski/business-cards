export class BusinessCard {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    additionalInfo: string;
    key: string;

    constructor (firstName: string, lastName: string, email: string,
                 phoneNumber: string, additionalInfo: string)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.additionalInfo = additionalInfo;
            this.key = '';
        }

}
