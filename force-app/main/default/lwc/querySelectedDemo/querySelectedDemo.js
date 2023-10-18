import { LightningElement } from 'lwc';

export default class QuerySelectedDemo extends LightningElement {
    employees =[
{
    id: 101,
    Name: "john",
    Salary : 50000
},
{
    id: 102,
    Name: "Ram",
    Salary :40000 
},
{
    id: 103,
    Name: "Mathew",
    Salary : 30000
}
    ]

    handleSelectClick(event){
        const empno =event.target.dataset.empno;
        const empname = event.target.dataset.empname;
        alert(`code=${empno} and name=${empname}`)

    }
    handleClearClick(event){
   //get data attribute value
   const empno =event.target.dataset.empno;
   this.template.querySelector(`lightning-input[data-empno= '${empno}']`).value="";
    }
    handleClearFirstClick()
    {
    //one way
    this.template.querySelector("lightning-input[data-empno='101']").value = "";
    }
    handleClearAllClick()
    {
//to identify all  sowe go for tag
Array.from(this.template.querySelectorAll("lightning-input")).forEach(e=>e.value="");
    }
// src vir https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/164.png
//	Rohit https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/107.png
// Hardhik 	https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/107.png
// Pujara 	https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/156.png
//Bumrah 	https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/bcci/1000x1280/1124.png

/*<template>
    <div class="slds-size_3-of-4">
        <div class="slds-box slds-box_x-small slds-text-align_center slds-m-around_x-small">Basic Carousel
            <lightning-carousel>
                <lightning-carousel-image
                    src = "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg"
                    header = "First Card"
                    description = "First card description."
                    alternative-text = "First card accessible description."
                    href = "javascript:void(0);">
                </lightning-carousel-image>
                <lightning-carousel-image
                    src = "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg"
                    header = "Second Card"
                    description = "Second card description."
                    alternative-text = "Second card accessible description."
                    href = "javascript:void(0);">
                </lightning-carousel-image>
                <lightning-carousel-image
                    src = "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg"
                    header = "Third Card"
                    description = "Third card description."
                    alternative-text = "Third card accessible description."
                    href = "javascript:void(0);">
                </lightning-carousel-image>
            </lightning-carousel>
        </div>
    </div>
</template>
*/
}