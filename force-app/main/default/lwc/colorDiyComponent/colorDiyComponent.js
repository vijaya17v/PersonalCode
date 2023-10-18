import { LightningElement } from 'lwc';

export default class ColorDiyComponent extends LightningElement {
    val;
    col;
    handleChange(event)
    {
    this.val= event.target.value;
              
    }
    handleClickBlue()
    {
        try{
            this.col = "myblueStyle";
            console.log(this.val);
        }
        catch(e)
        {
      console.log(e);
        }
      
    }
    handleClickRed()
    {
        this.col = "myredStyle";
    }
    handleClickGreen()
    {
        this.col = "mygreenStyle";
    }
}