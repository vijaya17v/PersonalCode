import { LightningElement ,wire,api,track} from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import getAccountLists from '@salesforce/apex/AccountController.getAccountLists';
export default class DataTableAccountComponent extends LightningElement {
    saveDraftValues
    wiredAccountsList
   /* columnsList =[
           {label:'Id',fieldName:'Id'},
           {label:'Name',fieldName:'Name'},
           {label:'Rating',fieldName:'Rating'},
       {
        type:'button',
        typeAttributes:{
            variant : 'brand',
            label :'view',
            value:'Open'
        }
       }
        ]; button*/ 
      /*  columnsList =[
            {label:'Id',fieldName:'Id'},
            {label:'Name',fieldName:'Name'},
            {label:'Rating',fieldName:'Rating'},
        {
         type:'button-icon',
         typeAttributes:{
             iconName : 'action:preview'
         }
        }
         ];icon button*/
       /*  columnsList =[
            {label:'Id',fieldName:'Id'},
            {label:'Name',fieldName:'Name'},
            {label:'Rating',fieldName:'Rating'},
        {
         type: 'action',
         typeAttributes:{
             rowActions :[
                {label: 'Show Details', name:'show_details',iconName: 'utility:preview'},
                {label: 'Remove Details', name:'remove_details',iconName: 'utility:close'}
                
                
             ]
         }
        }
         ]; action*/// editable column below
        /* columnsList =[
            {label:'Id',fieldName:'Id'},
            {label:'Name',fieldName:'Name',editable:true},
            {label:'Rating',fieldName:'Rating'},
         ] for editing  and saving saveDraftValues*/
   // @wire(getAccountLists)
   // accountsList
   columnsList =[
    {label:'Id',fieldName:'Id'},
    {label:'Name',fieldName:'Name'},
    {label:'Progress',fieldName:'progBar',type:'progRing'},

   ]
   data = [
    { 'Id':12345,'Name':'ABC','progBar':80},
    {'Id':12346,'Name':'xyz','progBar':50},
    {'Id':12347,'Name':'uir','progBar':20}
       
   
   ]
accList
accountList
   @wire(getAccountLists)
   getAccountListHandler(response)
   {
   this.wiredAccountsList= response;
    if(response.data)
    {
        this.accountList = response.data;
        this.accList=this.accountList.slice(0,3)
    }
   }
   handleClick(event)
   {
    //getSelectedRows  when check box is selected
    const rows = this.template.querySelector('lightning-datatable').getSelectedRows()
  console.log(rows);
   }
   handleSelect(event)
   {
    //this rows is part of lightning data table event tag
    const rows = event.detail.selectedRows;
    console.log('Selected Rows ::'+JSON.stringify(rows));
   }
   //onRowAction when icon button is selected
   handleRowAction(event)
   {
    console.log(JSON.stringify(event.detail));
    console.log(JSON.stringify(event.detail.row));
    console.log(JSON.stringify(event.detail.action));

   }
   handleSave(event)
   {
    this.saveDraftValues = event.detail.draftValues;
    
  //  console.log(this.saveDraftValues);
 //   console.log(JSON.stringify(this.saveDraftValues));
    //all the editable records to be saved in array so we go for array
  //  const modReInputs = this.saveDraftValues.slice();
 //   console.log(modReInputs);
/*ui record api -updateRecord -pass parameter in below structure
 {
    fields: {

    }
 } so we need to loop and store using  map {} object lietrals drafthave to be in key value format*/
 /*const  recInputs = this.saveDraftValues.slice().map(draft=>{
    const datas = Object.assign({},draft)
    
    return {fields:datas}
 }) this is one trype to convert he data into fields*/
   const vals =    JSON.parse(JSON.stringify(this.saveDraftValues));
   //we need to store in fields format one by one so go for map
   const v = vals.map(m=>{
    return {fields:m}
   })
   const promises = v.map(record=>updateRecord(record))
   //showToast so going for one more map
   //trying to connect with promise. if all the promises get completed the i can go for then
   Promise.all(promises)
   .then(res=>{
    this.dispatchEvent(new ShowToastEvent({
        title: 'Record Updation',
        message: 'Record Updated',
        variant: 'success'
    }));
    this.saveDraftValues= []
    refreshApex(this.wiredAccountsList)
   }).catch(error=>{
    console.log(error)

   })
  
   }
}