export class BusinessCard {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    organization: string;
    additionalInfo: string;
    key: string;
    imgUrl: string;

    constructor (firstName: string, lastName: string, email: string,
                 phoneNumber: string, organization: string, additionalInfo: string)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.organization = organization;
            this.additionalInfo = additionalInfo;
            this.key = '';
            this.imgUrl = '';
        }

}
