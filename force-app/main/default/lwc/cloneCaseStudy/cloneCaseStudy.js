import { LightningElement } from 'lwc';
import  { NavigationMixin } from 'lightning/navigation';
export default class CloneCaseStudy extends  NavigationMixin(LightningElement)  {

    handleClick(event)
    {
      this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes:{
            objectApiName : 'Case',
            actionName: 'new'
          
        }
      })
    }
}