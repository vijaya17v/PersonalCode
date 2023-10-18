import { LightningElement ,track} from 'lwc';
import RECIEPT_OBJECT from '@salesforce/schema/Receipt__c';
import CONTACT_FIELD from '@salesforce/schema/Receipt__c.Contact__c';
import RECIEPTID_FIELD from '@salesforce/schema/Receipt__c.Name';
import AMOUNT_FIELD from '@salesforce/schema/Receipt__c.Amount__c';
import AMOUNTPAIDDATE_FIELD from '@salesforce/schema/Receipt__c.AmountPaidDate__c';
import MODEOFPAY_FIELD from '@salesforce/schema/Receipt__c.Mode_Of_Pay__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Parentmodel extends LightningElement {
    objectName = RECIEPT_OBJECT;
    fieldsList = [RECIEPTID_FIELD,CONTACT_FIELD,AMOUNT_FIELD,AMOUNTPAIDDATE_FIELD,MODEOFPAY_FIELD];
  @track  showModel=false;
    handleClick(){
        console.log("in click");
        this.showModel= true;
    } 
    handleCancel()
    {
        console.log("in close");
        this.showModel=false;
    } 
    successHandler(event)
    {
       this.dispatchEvent(new ShowToastEvent({
            title: "Reciept Created",
            message:"Reciept Created with Id:"+event.detail.id,
            variant: "success"
        }));
        
    }
}