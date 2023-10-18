import { getObjectInfo,getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { LightningElement ,api,wire,track} from 'lwc';

export default class ObjectInfoComponent extends LightningElement {

    @api recordId;
    @api objectApiName;
    informa;
    recordTypeId;
    objectInfo1;
    @track pickvalue=[];
    @track fieldInfo=[];
    @track customFieldInfo = [];
    @wire(getObjectInfo,{objectApiName:'$objectApiName'})
    getObjectRec({data})
    {
        console.log(data);
        if(data)
        {
            this.recordTypeId = data.defaultRecordTypeId;
            for(let key in data.fields)
       {
        this.fieldInfo.push(key);
        this.informa = this.fieldInfo.filter((x) => x.includes("__c"))
        }
     
      
      /* for(let key in data.fields)
       {
        this.fieldInfo.push(key);
        console.log(key);
       }*/
      }
        
  }
  @wire(getPicklistValuesByRecordType,{objectApiName:'$objectApiName',recordTypeId:'$recordTypeId'})
getPickListRec({data})
{
    if(data)
    {
        for(let key in data.picklistFieldValues)
        {
            this.pickvalue.push(key);
        }
    }
}
}

     