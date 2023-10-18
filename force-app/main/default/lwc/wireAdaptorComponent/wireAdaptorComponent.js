import { LightningElement,wire,api,track } from 'lwc';
import  ACCOUNT_OBJECT from  '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import CONTACT_OBJECT  from '@salesforce/schema/Contact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import { getRecord } from 'lightning/uiRecordApi';
import Id from  '@salesforce/user/Id';
export default class WireAdaptorComponent extends LightningElement {
    accountData;
    userData;
    uId = Id;
    
    //below is also asynchronous  asgetRecord()
    
constructor(){
    super();
    console.log('constructor called');
    console.log(this.uId);
}
@wire(getRecord,{recordId:Id,fields:['User.Name','User.Email']})
getUserRecord({data,error})
{
    if(data)
    {
        console.log(this.uId);
        console.log(data)
   
  console.log('wire method called');
   this.userData=data.fields;
}
}

//@wire(getRecord,{recordId:'0018d00000VDCEHAA5',fields:['Account.Name','Account.Industry']})
/*@wire(getRecord,{recordId:'0018d00000VDCEHAA5',layoutTypes:'full'})
getAccountRecord(response)
{
    if(response.data)
    {

   
  console.log('wire method called');
  console.log(response);
  console.log(response.data.fields.Name.value);
  this.accountData=response.data.fields;
}
} */
/*getAccountRecord({data,error})
{
    if(data)
    {
    
  console.log('wire method called');
  
  console.log(data.fields.Name.value);
  this.accountData=data.fields;
}
if(error)
{
    console.log(error.message)
}
} */

connectedCallback()
{
    console.log("in connected callback")
}

}