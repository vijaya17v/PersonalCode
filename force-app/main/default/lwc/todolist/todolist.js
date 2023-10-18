import { LightningElement,track } from 'lwc';

export default class Todolist extends LightningElement {
@track Todos = [];
taskName;
count=0;
id;
handleChange(event)
{
   this.taskName = event.target.value;
    console.log(this.taskName);
}
handleClick()
{
   
  
   let obj = {
    id : this.Todos.length + 1,
    label : this.taskName
}
 
console.log(this.id);
console.log("in handle click");
this.taskName = '';
this.Todos.splice(this.Todos.length,0,obj);

} 
handleRemove(event)
{
  let val =  event.target.name;
  console.log(event.target.name);
  this.Todos.splice(
    this.Todos.findIndex((todo)=>
         todo.id === val)
   ,1
  );
  }
   
}
