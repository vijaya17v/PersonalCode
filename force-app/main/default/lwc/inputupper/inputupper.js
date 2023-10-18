import { LightningElement } from 'lwc';

export default class Inputupper extends LightningElement {

inputVal;
upper;
handleChange(event)
{
 this.inputVal = event.target.value;

 this.upper = this.inputVal.toUpperCase();

}

}



