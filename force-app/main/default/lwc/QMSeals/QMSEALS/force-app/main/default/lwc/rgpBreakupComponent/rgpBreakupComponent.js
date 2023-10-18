import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import { LightningElement,api,wire,track } from 'lwc';
import RgpBreakupController from '@salesforce/apex/RgpBreakupController.getRgpBreakupVal';
export default class RgpBreakupComponent extends LightningElement {
columnLists = [ {label :'RGP Break-Up', fieldName:'Name'},
                {label :'breakup Status', fieldName:'breakup_Status__c'},
                {label :'Required Qty', fieldName:'Required_Qty__c'},
                {label :'Materials', fieldName:'Materials__c'},
                {label :'Break-up Details', fieldName:'Break_up_Details__c'},
                 ];
@api recordId;
@track detail;
                 handleClick(event) 
                 {
                    RgpBreakupController({rgpId :'$recordId'} )
                    getRgpDetals({data,error})
                    { 
                        if(data)
                        {
                            this.detail = data;

                        }
                   }

                 }           

}