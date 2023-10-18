import { LightningElement,track } from 'lwc';

export default class Employee extends LightningElement {
sal;
isMaxSal = false;
@ track empl=[];
@track Employe = [
    {
        name : "Sandy",
        Position: "Manager",
        salary : 400000
    },
    {
        name : "Manish",
        Position: "Team Member",
        salary : 20000
    },
    {
        name : "Anita",
        Position: "Engineer",
        salary : 35000
    },
    {
        name : "Anand",
        Position: "staff",
        salary : 10000
    }
]
handleChange(event)
{
 this.sal =  parseInt(event.target.value);
}
handleClick()
{
 this.Employe.forEach((emp1) =>
  {
    if(emp1.salary > this.sal)
   {

    console.log(this.sal);
    console.log(emp1.salary);
    this.empl.push(emp1);
    this.isMaxSal = true;  
   console.log(this.isMaxSal);
   }
   
})

}
}