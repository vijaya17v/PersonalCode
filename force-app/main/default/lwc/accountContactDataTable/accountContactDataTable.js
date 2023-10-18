import { LightningElement,wire,api,track } from 'lwc';
import getAccountContactList from '@salesforce/apex/ContactController.getAccountContactList';
import { getFieldValue,getRecord } from 'lightning/uiRecordApi';
import ACCOUNTS_ID from '@salesforce/schema/Opportunity.AccountId';
export default class AccountContactDataTable extends LightningElement {
@api recordId;
@api OpAccId;
@track val;
columnsList = [{label:'Last Name',fieldName:'LastName'},{label:'MobilePhone',fieldName:'MobilePhone'}];
    @wire(getRecord,{recordId:'$recordId',fields : [ACCOUNTS_ID]})
    getOppData({data,error})
    {
        if(data)
        {
      this.OpAccId= getFieldValue(data, ACCOUNTS_ID);
     
        }
        console.log('this.OpAccId');
        console.log(this.OpAccId);
  }
   @wire(getAccountContactList,{accountId : '$OpAccId'})
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