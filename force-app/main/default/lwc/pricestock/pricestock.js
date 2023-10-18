import { LightningElement ,track} from 'lwc';

export default class Pricestock extends LightningElement {
 isAvail = true;
 stock;
 name;
@ track product = 
    {
        name: "AC",
        price: 50000,
        stock: 3
    }

handleChange(event)
{
   this.stock =  parseInt(event.target.value);
     if(this.stock == 0){
       this.isAvail = false;
       console.log(`in if = ${this.isAvail}`);
    }
  else {
    console.log(`in else stock = ${this.stock}`);
    
    this.product.stock = this.stock;
    console.log(`in else= ${this.product.stock}`);
    this.isAvail = true;
  }
    }
   
}

