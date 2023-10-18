import { LightningElement,api,track,wire } from 'lwc';
import getRecieptContactList from '@salesforce/apex/ContactController.getRecieptContactList';
export default class RecieptcomponentCaseStudy extends LightningElement {
    @api recordId;
    @track datas;
    columnsList =[{label:'Name',fieldName:'Name'},
    {label:'Amount',fieldName:'Amount__c'},
    {label:'Payment Method',fieldName:'Mode_Of_Pay__c'},
    {label:'AmountPayed',fieldName:'AmountPaidDate__c'}
    
];

   @wire(getRecieptContactList,{contactId :'$recordId'}) 
   getRecptVal({data,error})
   {
    if(data)
    {
        this.datas = data;
  //location.reload();      
    }
   }

}