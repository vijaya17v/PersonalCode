import { LightningElement } from 'lwc';
import  ACCOUNT_OBJECT from  '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import NAME_FIELD from '@salesforce/schema/Account.Name';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EditformComponent extends LightningElement {
    fieldList={
        nameField : NAME_FIELD,
        industryField : INDUSTRY_FIELD,
        annualRevenueField : ANNUAL_REVENUE_FIELD,
        phoneField: PHONE_FIELD
    }
    successHandler(event)
    {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Record success',
            message: 'form submitted',
            variant: 'success'
        }));
    }
    submitHandler(event)
    {
       event.preventDefault(); //stop the default behaviour of the button
//1.get the input 2. check value 3. submit data
  const inputRevenue = this.template.querySelector(".Revenue").value;
  if(inputRevenue<100)
  {
    this.dispatchEvent(new ShowToastEvent({
        title: 'Annual revenue cannot be less than 100',
        message: 'event.detail.message',
        variant: 'error'
    }));
  }else{
    const fields= event.detail.fields;
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

    }
    errorHandler(event)
    {
   this.dispatchEvent(new ShowToastEvent({
    title: 'Error Creating Data',
    message: 'event,detail.message',
    variant: 'error'
}));
    }
}