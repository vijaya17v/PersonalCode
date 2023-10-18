import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
    clickedButtonAnswer;
    num1;
    num2;
    
    handleChange1(event){
      this.num1  =   event.target.value;
    }
    handleChange2(event){
        this.num2 = event.target.value;
    }
    handleClickAdd() {

      this.clickedButtonAnswer =  Number(this.num1) + Number(this.num2);
       
    }

    handleClickSub(){
        this.clickedButtonAnswer =  this.num1 - this.num2;
    }

    handleClickMul(){

        this.clickedButtonAnswer =  this.num1* this.num2;

    }

    handleClickDiv(){
        this.clickedButtonAnswer =  this.num1 / this.num2;
        
    }

    handleClickClear(){
    this.num1 = '';
    this.num2 = '';
    this.clickedButtonAnswer = 0;
    }
 
}