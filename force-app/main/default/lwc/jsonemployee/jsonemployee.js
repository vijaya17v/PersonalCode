import { LightningElement,track} from 'lwc';

export default class Jsonemployee extends LightningElement {
  @track emp =[];
 @track Newem =[];
 name;
 @track searchName = [];
 isAvailable;
 Sal;
 Nam;
 Pic;
 Code;
 Mail;
 Itemcount =0;
 dispcurrentItem;

  async handleClick()
    {
     console.log("click");
      let url = "https://sfdev36-dev-ed.my.salesforce-sites.com/services/apexrest/employees"
       let response = await fetch(url,{method:"Get"});
      let data = await response.json();
     this.emp = Object.values(data);
      console.log( JSON.stringify(this.emp));
      this.emp.forEach((element,index) => {
        for(let i =0;i<element.length;i++)
        {
            this.Newem.push(
                {
                   "Salary" : element[i].Salary,
                    "Photo" : element[i].Photo,
                    "Email" : element[i].Email,
                    "Code":  element[i].Code,
                    "Name" : element[i].Name
                }
            );
        }
      });
      
    }
    get empdet()
    {
        return this.Newem
    }
    handleChange(event)
    {
       this.name = event.target.value;
       console.log(this.name);
    }

    handleSearchClick()
    {
        console.log("in search click");
      this.searchName = this.Newem.filter(x => (x.Name === this.name)
         );
         if(this.searchName!=null)
         {
            console.log("in if");
            this.isAvailable = true;
          }
         else
         {
            this.isAvailable  = false;
         }
       console.log(`search ${JSON.stringify(this.searchName)}`);
       
    }
    handleDispClick()
    {
      
      console.log(this.Newem.length);
          this.dispcurrentItem = 0;
          this.Sal = this.Newem[this.dispcurrentItem].Salary;
          this.Code = this.Newem[this.dispcurrentItem].Code;
          this.Mail = this.Newem[this.dispcurrentItem].Email;
          this.Nam = this.Newem[this.dispcurrentItem].Name;
          this.Pic = this.Newem[this.dispcurrentItem].Photo;
       console.log(`this name ${this.Nam}`);
    }
    handleNextClick(){
      if(this.template.querySelector(".prev").disabled=== true)
        {
          this.template.querySelector(".prev").disabled= false;
        }
      console.log(`Itemcount ${this.dispcurrentItem}`);
       if(this.dispcurrentItem !==  this.Newem.length-1)
       {
       console.log("in if this name ");
         
          this.dispcurrentItem =this.dispcurrentItem + 1;
          console.log( this.dispcurrentItem);
          this.Sal = this.Newem[this.dispcurrentItem].Salary;
          this.Code = this.Newem[this.dispcurrentItem].Code;
          this.Mail = this.Newem[this.dispcurrentItem].Email;
          this.Nam = this.Newem[this.dispcurrentItem].Name;
          this.Pic = this.Newem[this.dispcurrentItem].Photo;
          console.log(this.Nam);
          
         }
         else 
         {
           this.template.querySelector(".next").disabled= true;
         }
        
      }
      handlePrevClick()
      {
        if(this.template.querySelector(".next").disabled=== true)
        {
          this.template.querySelector(".next").disabled= false;
        }
        if(this.dispcurrentItem!==0)
        {
          console.log("in if prev");
       
          this.dispcurrentItem =this.dispcurrentItem-1;
          
            this.Sal = this.Newem[this.dispcurrentItem].Salary;
            this.Code = this.Newem[this.dispcurrentItem].Code;
            this.Mail = this.Newem[this.dispcurrentItem].Email;
            this.Nam = this.Newem[this.dispcurrentItem].Name;
            this.Pic = this.Newem[this.dispcurrentItem].Photo;
            console.log(this.Nam);
          
        }
        else{
          this.template.querySelector(".prev").disabled= true;
        }
      }
       
      
       
    }
   
