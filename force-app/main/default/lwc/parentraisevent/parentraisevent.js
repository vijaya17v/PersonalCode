import { LightningElement } from 'lwc';

export default class Parentraisevent extends LightningElement {
    handleDisplay(event){

        console.log("In parent event")
        console.log(event.detail);
        console.log(event.detail.code);
        console.log(event.detail.name);
    }
    handleClick()
    {
        this.template.querySelector("c-childraisevent").handleStart();
        this.template.querySelector("lightning-button").disabled=true;
    }
    handleProg()
    {
        console.log("in handle prog");
        this.template.querySelector("lightning-button").disabled=false;
      this.template.querySelector("c-childraisevent").handleReset();
           }

}