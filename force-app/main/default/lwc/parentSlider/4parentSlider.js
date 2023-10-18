import { LightningElement,api } from 'lwc';

export default class ParentSlider extends LightningElement {
    employees = [
        {
            id: 101,
            name:"Joseph"
        },
        {
            id: 102,
            name:"Krish"
        },
        {
            id: 103,
            name:"Saman"
        }
    ]
    slidervalue;
    @api maxsliderval;
    handleChange(event){
        this.slidervalue = event.target.value;
    }
    handleClick()
    {
         this.template.querySelector("lightning-input").value = 0;
        this.template.querySelector("c-child-slider").resetslidervalue();
        
    }

}