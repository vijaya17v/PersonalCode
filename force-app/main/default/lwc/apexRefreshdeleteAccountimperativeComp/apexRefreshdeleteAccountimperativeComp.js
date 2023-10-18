import { LightningElement ,track,api,wire} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import newContact from '@salesforce/apex/ContactController.newContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';
export default class ApexRefreshdeleteAccountimperativeComp extends LightningElement {
    @track accountsList;
    @api recordId;
     lastName;
    mobilePhone;
    wiresAccountResponse;
   /*handleClick(event){
        //passing parameter in form of object
         getAccountList({rating : 'Hot'})
        .then(response=>{
         console.log(response)
        this.accountsList = response;
        })
        .catch(error=>{
   this.dispatchEvent(new ShowToastEvent({
    title: 'title',
    message: 'message',
    variant: 'error'
   }));
        }) 

    }*/
    @wire(getAccountList,{rating:'Hot'})
    getAccountListHandler(response)
    {
      this.wiresAccountResponse = response;
       if(response.data)
    {
      this.accountsList = response.data;
      console.log(this.accountsList);

    }
      }
    handleChange(event)
      {
       const {name,value} =event.target;
      if(name=="lastName")
      {
        this.lastName = value;
      }
      if(name=="mobilePhone")
      {
        this.mobilePhone = value;
      }
      }
      handleDelete(event)
      {
        console.log('in del');
       console.log(event.target.name) ;
      const recId = event.target.name;
      deleteRecord(recId)
      .then(response=>{
      this.dispatchEvent(new ShowToastEvent({
          title: 'Record is deleted',
          message: 'Record is deleted'+recId,
          variant: 'success'
      }));
      //refresh Apex
      refreshApex(this.wiresAccountResponse)
      })
      .catch(error=>{
   this.dispatchEvent(new ShowToastEvent({
       title: 'title',
       message: 'error',
       variant: 'error'
   }));
      })
      }
      createClick()
      {
        console.log('in click');
        //imperative wayb as it is button click
        newContact({lastName :this.lastName,mobile:this.mobilePhone,accountId:this.recordId})
       .then(response=>{
        console.log('response');
      this.dispatchEvent(new ShowToastEvent({
          title: 'Insert Record',
          message: 'Record Id'+response,
          variant: 'success'
      }));
       })
       .catch(error=>{
        
        console.log(error.body.pageErrors[0].message);
        
  this.dispatchEvent(new ShowToastEvent({
      title: 'Insert Record',
      message: 'unable to create a record' +error.body.pageErrors[0].message,
      variant: 'error'
  }));
       })
    }
      
    }