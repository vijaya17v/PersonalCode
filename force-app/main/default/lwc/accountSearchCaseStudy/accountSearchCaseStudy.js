import { LightningElement,track } from 'lwc';
import getAccountSearch from '@salesforce/apex/AccountController.getAccountSearch';
export default class AccountSearchCaseStudy extends LightningElement {
val;
  resp ;
  respId;
  respName;
  respBS;
  respAcNum;
    handleChange(event)
    {
     this.val =  event.target.value;
     console.log(this.val);
    }

    handleClick(event)
    {
     
        getAccountSearch({acname :this.val})
        .then(response =>{
            console.log(response);
        this.resp = response;
       this.respId= response.Id;
       this.respName = response.Name;
       this.respAcNum=response.AccountNumber;
       this.respBS = response.Billingcity;

        })
        .catch(error =>{
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error,
                variant: 'error'
            }));
        })
    }
}