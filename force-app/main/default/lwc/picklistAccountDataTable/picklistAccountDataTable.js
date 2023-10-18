import { LightningElement ,wire,api,track} from 'lwc';
import getAccountLi from '@salesforce/apex/AccountController.getAccountLi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
export default class PicklistAccountDataTable extends LightningElement {
   
  @track ratingOptions;
   wiredAccountsList;
  @track accRating;
  @track accountData;
 @track accountList =[];
 lastSavedData = [];
 saveDraftValues;
 @track draftValues = [];

showSpinner = false;
 
  columnsList =[
    {label:'Id',fieldName:'Id'},
    {label:'Name',fieldName:'Name',editable: true },
    {label:'Rating',fieldName:'Rating',type:'ratingPickList',wraptext: true ,editable: true ,typeAttributes: {
      placeholder: 'Choose Type', 
      options: {fieldName: 'ratingOptions'},
      value: { fieldName: 'Rating' },
      context: { fieldName: 'Id' }
 }
      }
 ];

 @wire(getObjectInfo,{objectApiName:'Account'})
    getAccountObjeInf({data,error})
    {
        console.log('inobje') ;
      if(data)
      {
        console.log('Account');
        console.log(data);
         this.recordtypeId =  data.defaultRecordTypeId;
           
      }
      if(error)
      {
        console.log(error);
      }
    }
    @wire(getPicklistValues,{recordTypeId:'$recordtypeId',fieldApiName:RATING_FIELD})
    getPickListData({data,error})
    {
        let val ;
        if(data)
   {
    this.ratingOptions = data.values;
  //  val = data.values;
    
     /*  this.ratingOptions = val.map(d=>{
        console.log(d);
        return { label: d.label, value: d.value }
       })*/
       console.log(JSON.stringify(this.ratingOptions));
}
    }
    
        
       /*
       .map(draft=>{
            const datas = Object.assign({},draft)
            
            return { label: datas.label, value: datas.value }
         })
       this.ratingOptions = val.map(d=>{
          console.log(d);
          return { label: d.label, value: d.value }
         })
         console.log('this.ratingOptions'+this.ratingOptions);
        }*/
        


   
    @wire(getAccountLi,{pickList: '$ratingOptions'})
    getAccountListHandler(response)
    {
      console.log('Accountlist2');
        console.log(response)

        this.accountData=response;
        console.log('this.accountData'+this.accountData);
   // this.wiredAccountsList= response;
     if(response.data)
     {
      this.accountList=  JSON.parse(JSON.stringify(response.data));
      console.log('getAccList');
      console.log(this.accountList);
      this.accountList.forEach(ele => {
        ele.ratingOptions = this.ratingOptions;
      console.log('ele.ratingOptions');
      console.log(ele.ratingOptions);
    })
   this.lastSavedData= JSON.parse(JSON.stringify(this.accountList));
   console.log('this.lastSavedData');
   console.log(this.lastSavedData);
      }
      else if (response.error) {
        this.accountList=undefined;
    }
    };
   /* updateDataValues(updateItem) {
      let copyData=JSON.parse(JSON.stringify(this.data));
      console.log('updateItem'+updateItem);

      copyData.forEach(item => {
          if (item.Id === updateItem.Id) {
              for (let field in updateItem) {
                  item[field]=updateItem[field];
              }
          }
      });

      //write changes back to original data
      this.accountList=[...copyData];
  }*/

  updateDraftValues(updateItem) {
      let draftValueChanged=false;
      let copyDraftValues=[...this.draftValues];
      //store changed value to do operations
      //on save. This will enable inline editing &
      //show standard cancel & save button
      copyDraftValues.forEach(item => {
          if (item.Id === updateItem.Id) {
              for (let field in updateItem) {
                  item[field]=updateItem[field];
              }
              draftValueChanged=true;
          }
      });

      if (draftValueChanged) {
          this.draftValues=[...copyDraftValues];
      } else {
          this.draftValues=[...copyDraftValues, updateItem];
      }
  }

  //handler to handle cell changes & update values in draft values
  handleCellChange(event) {
      //this.updateDraftValues(event.detail.draftValues[0]);
      let draftValues = event.detail.draftValues;
      draftValues.forEach(ele=>{
          this.updateDraftValues(ele);
      })
  }

  handleSave(event) {
      this.showSpinner = true;
      this.saveDraftValues = this.draftValues;

      const recordInputs = this.saveDraftValues.slice().map(draft => {
          const fields = Object.assign({}, draft);
          return { fields };
      });

      // Updateing the records using the UiRecordAPi
      const promises = recordInputs.map(recordInput => updateRecord(recordInput));
      Promise.all(promises).then(res => {
          this.showToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
          this.draftValues = [];
          return this.refresh();
      }).catch(error => {
          console.log(error);
          this.showToast('Error', 'An Error Occured!!', 'error', 'dismissable');
      }).finally(() => {
          this.draftValues = [];
          this.showSpinner = false;
      });
  }

  handleCancel(event) {
      //remove draftValues & revert data changes
      this.data=JSON.parse(JSON.stringify(this.lastSavedData));
      this.draftValues = [];
  }

  showToast(title, message, variant, mode) {
      const evt=new ShowToastEvent({
          title: title,
          message: message,
          variant: variant,
          mode: mode
      });
      this.dispatchEvent(evt);
  }

  // This function is used to refresh the table once data updated
  async refresh() {
      await refreshApex(this.accountData);
  }
  /* handleCellChange(event) {
      this.draftValues = event.detail.draftValues;
      console.log('this.draftValues');
      console.log(this.draftValues);
      this.draftValues.forEach(ele=>{
          this.updateDraftValues(ele);
          console.log('ele');
          console.log(ele);
      })
  }
  updateDraftValues(updateItem) {
    let draftValueChanged = false;
    let copyDraftValues = [...this.draftValues];
    //store changed value to do operations
    //on save. This will enable inline editing &
    //show standard cancel & save button
    copyDraftValues.forEach(item => {
        if (item.Id === updateItem.Id) {
            for (let field in updateItem) {
                item[field] = updateItem[field];
            }
            draftValueChanged = true;
        }
    });

    if (draftValueChanged) {
        this.draftValues = [...copyDraftValues];
    } else {
        this.draftValues = [...copyDraftValues, updateItem];
    }
  }

handleSave(event)  
                  {
                    this.saveDraftValues = this.draftValues;
                    console.log(this.saveDraftValues);
                    const vals =    JSON.parse(JSON.stringify(this.saveDraftValues));
                    console.log(vals);
                    const v = vals.map(m=>{
                      return {fields:m}
                     })
                     const promises = v.map(record=>updateRecord(record))
                     Promise.all(promises)
                     .then(res=>{
                      console.log('res');
                      console.log(res);
                     this.dispatchEvent(new ShowToastEvent({
                          title: 'Record Updation',
                          message: 'Record Updated',
                          variant: 'success'
                      }));
                      this.saveDraftValues= []
                     return this.refresh();
                      }).catch(error=>{
                      console.log(error)
                  
                     })
                     
                    }
handleCancel(event) {
        //remove draftValues & revert data changes
        this.accountList = JSON.parse(JSON.stringify(this.lastSavedData));
        this.draftValues = [];
    }

 async refresh() {
        await refreshApex(this.accountData);
    }*/

}

    
