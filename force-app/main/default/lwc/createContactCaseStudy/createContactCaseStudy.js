import { LightningElement,track } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from  '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from  '@salesforce/schema/Contact.Email';
import  DEPARTMENT from '@salesforce/schema/Contact.Department';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CreateContactCaseStudy extends LightningElement {
    objectName = CONTACT_OBJECT;
    fieldsList = [FIRSTNAME_FIELD,LASTNAME_FIELD,EMAIL_FIELD,DEPARTMENT];
    successHandler(event)
    {
       this.dispatchEvent(new ShowToastEvent({
            title: "Contact Created",
            message:"Contact Created with Id:"+event.detail.id,
            variant: "success"
        }));
        
    }

}