import { LightningElement ,track,api,wire} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import updateRevenue from '@salesforce/apex/AccountController.updateRevenue';
import newContact from '@salesforce/apex/ContactController.newContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex';

export default class PageRefreshComponent extends LightningElement {
    handleClick(event) 
    {
        updateRevenue({recId:'0018d00000VD5TyAAL'})
        .then(response=>{
         console.log('revenue updated');
       this.dispatchEvent(new CustomEvent('refreshaccount',{
        detail:'Refresh Account'
       }))
        })

        .catch(error=>{

        })
    }
}