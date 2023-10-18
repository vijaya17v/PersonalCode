import { LightningElement,wire,api,track } from 'lwc';
import getAccountContactList from '@salesforce/apex/ContactController.getAccountContactList'
export default class RelatedcontactDiyComponent extends LightningElement {
   @api recordId;
   val;

   
    @wire(getAccountContactList,{accountId : '$recordId'})
    getConList({data,error})
    {
        console.log('inwireaccount');
        if(data)
        {
            console.log(data);
            this.val = data;
        }
    }

}