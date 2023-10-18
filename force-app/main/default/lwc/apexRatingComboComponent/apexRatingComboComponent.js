import { LightningElement ,track,api,wire} from 'lwc';
import getRating from '@salesforce/apex/RatingController.getRating';
import { getListUi } from 'lightning/uiListApi';
import { getListInfoByName } from 'lightning/uiListsApi';
export default class ApexRatingComboComponent extends LightningElement {
val;
@track AccountDetails;
get options() {
    return [
        { label: 'Hot', value: 'Hot' },
        { label: 'Warm', value: 'Warm' },
        { label: 'Cold', value: 'Cold' },
    ];
}
    handleChange(event)
    {
        
    this.val = event.detail.value;
    console.log(this.val);
    }
@wire(getRating,{rating : '$val'} )
getpicklistdata({data})
{
    console.log('ingetpick');
    console.log(data);
    if(data)
    {
   this.AccountDetails = data;
        console.log('hi in rating');
       console.log(data);
    }

}


}