import { LightningElement,api } from 'lwc';

export default class ChildSlider extends LightningElement {
@api employee;
@api slidervalue;
@api maxsliderval;

@api resetslidervalue(){
this.slidervalue = 0;
}

}