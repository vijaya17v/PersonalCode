import { LightningElement,wire,track,api } from 'lwc';
import lightningDataTable from 'lightning/datatable';
import progressRing from './progressRing.html';
import pickList from './pickList.html';
import pickliststatic from './pickliststatic.html';
export default class CustomDataTable extends lightningDataTable {
   static customTypes = {
//type:button button here is proring
    progRing:{
        template: progressRing
    },
    ratingPickList:{
      //  template: pickList,
        template: pickliststatic,
        editTemplate: pickList,
        standardCellLayout: true,
        typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name']
    }
}

    }
    
        
      
     
