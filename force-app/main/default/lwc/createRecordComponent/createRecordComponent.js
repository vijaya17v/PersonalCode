
import { LightningElement,wire,api,track } from 'lwc';
import Account_object from '@salesforce/schema/Account'
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

import { getRecord ,getFieldValue,createRecord,updateRecord,deleteRecord} from 'lightning/uiRecordApi';
import { getObjectInfo ,getPicklistValues} from 'lightning/uiObjectInfoApi';
export default class CreateRecordComponent extends LightningElement {
  recordId = '0018d00000eNe6cAAC';
    //create
    /*
    {
      Id:'0988',
        Name : 'abd',
        Industry : 'IT,
        AnnualRevenue: 50
    }
    */
   formData = {}
   
  changeHandler(event) 
  {
    //formData['Name']= 'Abc'
    const{name,value} =  event.target
    this.formData[name]= value;
  }
  handleClick()
  {
    console.log('in del')
    
   // createRecord({apiName:'Account',fields:this.formData})
    //updateRecord({fields:this.formData})
    //asyncronous coomunation

   /* console.log('in up')
    .then(response=>{
        console.log(response)
        this.formData={}
    })*/
    
   
    deleteRecord('0018d00000eNe6cAAC')
    .then(response=>{
      console.log(response)
    })
  }
}