import { LightningElement,api,wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
export default class ApexAccountComponent extends LightningElement {
//impoort method
    //call Apex --wire -property or function
    accountList
    rating = 'Hot'
@wire(getAccountList,{Rating:'$rating'})
accountHandler({data,error})
{
    console.log('in rest');
    if(data)
    {
        console.log('in res');
        console.log(data);
        this.accountList = data;
    }
    if(error)
    {
        console.log(error.message);
    }
}

}