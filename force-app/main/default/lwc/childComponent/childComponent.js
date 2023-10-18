import { LightningElement,api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api teams
   
    hello()
    {
        console.log("in child");
    }
}