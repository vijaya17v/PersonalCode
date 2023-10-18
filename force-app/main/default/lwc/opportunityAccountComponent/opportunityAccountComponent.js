  import { LightningElement,wire,api,track } from 'lwc';
  import { getFieldValue,getRecord } from 'lightning/uiRecordApi';
  import ACCOUNTS_ID from '@salesforce/schema/Opportunity.AccountId';
  import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
  import  PRICEBOOK_ID from '@salesforce/schema/Opportunity.Pricebook2Id';
  import getOppList  from '@salesforce/apex/AccountController.getOppList';
  import getProdLi from '@salesforce/apex/AccountController.getProdLi';
  import Name from '@salesforce/schema/Account.Name';
  //import getAccountoppLi from '@salesforce/apex/AccountController.getAccountoppLi'
  export default class OpportunityAccountComponent extends LightningElement {
   @api recordId;
  // recordId ='0068d00000DUiHwAAL';
      LineItemList;
   
    pd =[];
    oppResp;
      Fields = [ACCOUNTS_ID,PRICEBOOK_ID];
      oppobjInfo;
      jsProId =[];
  @api   OpAccId;
    @api  OpPri;
    priceBId =[];
      @track datas = [];
    /* columnsList =[
          {label:'Id',fieldName:'Id'},
          {label:'Quantity',fieldName:'Quantity'},
          {label:'Product Name',fieldName:'ProductName'},
          {label:'Account Name',fieldName:'ProductAccount'}
      ] ;*/
      columnsList =[
          {label:'Product Name',fieldName:'Name'},
          {label:'Account Name',fieldName:'Account__c'}
      ] ;
    
      @wire(getRecord,{recordId:'$recordId',fields : [ACCOUNTS_ID,PRICEBOOK_ID]})
      getOppData({data,error})
      {
          if(data)
          {
          this.oppobjInfo = data; 
        this.OpAccId= getFieldValue(data, ACCOUNTS_ID);
        this.OpPri=  getFieldValue(data, PRICEBOOK_ID);
          }
          console.log('this.OpAccId');
          console.log(this.OpAccId);
    }

      handleClick()
      {
        try{
      let val =[];
      //getSelectedRows  when check box is selected
      const rows = this.template.querySelector('lightning-datatable').getSelectedRows()
    for(const row of rows)
    {
      console.log(row.Id);
      val.push(row.Id);
    }
    console.log('val');
    console.log(JSON.stringify(val));
    console.log('val');
   this.pd= JSON.parse(JSON.stringify(val));
   console.log(this.pd);
    // getOppList({oppId :this.recordId , PbEntryId : '$OpPri'})
     getOppList({oppId :this.recordId,PbEntryId : this.OpPri,pricebookId : this.pd })
          .then(response=>{
          //  this.dispatchEvent(new CustomEvent('refreshopportunitylineitem',{
           // }))
           location.reload();
          console.log(response)
          this.oppResp = response;
        //  eval("$A.get('e.force:refreshView').fire();");
        
        console.log('this.oppResp');
          console.log(this.oppResp);
          })
          .catch(error=>{
    this.dispatchEvent(new ShowToastEvent({
      title: 'title',
      message: 'message',
      variant: 'error'
    }));
      })
      
    }
    catch(e)
    {
      console.error(e.message);
    }
  }
  
 
  @wire(getProdLi,{accountId :'$OpAccId'})
  getRecPro({data})
  {
      console.log('prod deta');
      console.log(data);
      if(data)
      {
          console.log('get pro detail');
          this.datas = data;
      } 
  }

    

  }