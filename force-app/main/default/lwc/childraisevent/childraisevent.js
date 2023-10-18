import { LightningElement,api } from 'lwc';

export default class Childraisevent extends LightningElement {
     progress = 30;
    @api handleStart(){
        this._Interval= setInterval(()=>{
      
        this.progress = this.progress + 10;
        if(this.progress >= 100){
            const e =  new CustomEvent("prog");
           this.dispatchEvent(e);
       }
       },200)
       
}
  @api  handleReset()
    {
        console.log("reset");
        clearInterval(this._Interval);
        this.progress = 0;
    }
  handleClick()
    {
        
        
    //  1.custom event
console.log("In child event");
  const e =  new CustomEvent("display",{detail:
{
    code :101,
    name:'sita'
}
});
    //2.dispatch event
   this.dispatchEvent(e);
    }
}