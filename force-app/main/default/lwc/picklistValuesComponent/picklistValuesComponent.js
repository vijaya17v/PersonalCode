
import { LightningElement,wire,api,track } from 'lwc';
import Account_object from '@salesforce/schema/Account'
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

import { getRecord ,getFieldValue} from 'lightning/uiRecordApi';
import { getObjectInfo ,getPicklistValues} from 'lightning/uiObjectInfoApi';
const fields = [NAME_FIELD,INDUSTRY_FIELD,ANNUALREVENUE_FIELD]
const obj = [Account_object]

export default class PicklistValuesComponent extends LightningElement {
    recordTypeId;
    value;
    industryOptions;
@wire(getObjectInfo,{objectApiName:'Account'})
getObjectData({data})
{
    if(data)
    {
      this.recordTypeId =  data.defaultRecordTypeId;
    }
}
@wire(getPicklistValues,{recordTypeId:'$recordTypeId',fieldApiName:INDUSTRY_FIELD})
getpicklistdata({data})
{
    if(data)
    {
     
      //loop

    this.industryOptions =  data.values.map(d=>{
        console.log(d);
       return { label: d.label, value: d.value }
      })
      /*  return [
            { label: 'New', value: 'new' },
            { label: Value, value: Api Name },
            { label: 'Finished', value: 'finished' },
        ];*/
    }
}
handleChange(event)
{
  this.value =  event.detail.value;
}
}