import { LightningElement } from 'lwc';
import  ACCOUNT_OBJECT from  '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import CONTACT_OBJECT  from '@salesforce/schema/Contact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import AccountTemplate from './accConComponent1.html';
import ContactTemplate from './accConComponent2.html';
import defaultTemplate from './accConComponent.html';
export default class AccConComponent extends LightningElement {
    objectName 
    fieldList
    selectedValue;
    handleClick(event)
    {
     this.selectedValue =    event.target.label;
     if(this.selectedValue === 'Account' )
     {
     this.objectName = ACCOUNT_OBJECT;
    this.fieldList=[NAME_FIELD,PHONE_FIELD,RATING_FIELD];
     }
     else if(this.selectedValue === 'Contact')
     {
      this.objectName = CONTACT_OBJECT;
      this.fieldList = [FIRST_NAME,LAST_NAME,EMAIL];
    }
    }
    render()
    {
      return this.selectedValue === 'Account' ? AccountTemplate:
      this.selectedValue === 'Contact' ? ContactTemplate:
      defaultTemplate
    }
    handleToast(event)
    {
      this.dispatchEvent(new ShowToastEvent({
      title: `${this.selectedValue}  ' Created'`,
      message: event.detail.id,
      variant: "success"
    })
    )
    
    
}
    
}