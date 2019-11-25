export class BusinessCard {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    organization: string;
    additionalInfo: string;
    key: string;
    imgUrl: string;

    constructor (firstName: string, lastName: string, organization: string,
                 email: string, phoneNumber: string, additionalInfo: string)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.organization = organization;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.additionalInfo = additionalInfo;
            this.key = '';
            this.imgUrl = '';
        }

}
