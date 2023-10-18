public  with sharing class AccountController {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountList(String rating){
    return  [SELECT 
           Id,AnnualRevenue,Name
             FROM Account 
             WHERE  Rating =:rating
            ];
   }
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountLists(){
    return  [SELECT 
           Id,Name,Rating
             FROM Account WHERE  Rating ='Hot'
           ];
   }
   @AuraEnabled(cacheable=true)
   public static List<Account> getAccountLi(){
    return  [SELECT 
           Id,Name,Rating
             FROM Account 
             WHERE  Rating !=NULL limit 10
           ];
   }

   @AuraEnabled(cacheable=true)
   public static Account getAccountSearch(String acname){
    return  [SELECT 
           Id,Name,AccountNumber,BillingState
             FROM Account 
             WHERE  Name =:acname
           ];
   }

  /* @AuraEnabled(cacheable=true)
   public static List<OpportunityLineItem> getAccountoppLi(String oppId){
    
   return  [SELECT 
          Id,Quantity,Product2.Name,Product2.Account__c from OpportunityLineItem
             
             WHERE  OpportunityId =:oppId  
           ]; 
         
   }*/
   @AuraEnabled(cacheable=true)
   public static List<Product2> getProdLi(String accountId){
    
     return  [SELECT 
           Name,Account__c from Product2 where Account__c =:accountId
             ];     
          
   }
   @AuraEnabled
   public static boolean getOppList(String oppId,String PbEntryId,List<String> pricebookId)
   {
  List<PriceBookEntry> priceBookList = new  List<PriceBookEntry>();
   List<OpportunityLineItem> oplist = new List<OpportunityLineItem>();
  /* set<String> ids = new set<String>();
   for(String p: pricebookId)
   {
    ids.add(p);
   }
   
 first add the Standard PriceBook in PricebookEntry by passing Standard PriceBookId in the required PriceBook2Id within PricebookEntry.
Then add your custom PriceBook to PriceBookEntry.

   */
 // system.debug(ids);
 
  for(String d:pricebookId)
  {
    List<PriceBookEntry>  priceBookList1 = [SELECT Id, Product2Id,Pricebook2Id  FROM PriceBookEntry WHERE Product2Id =: d  AND Pricebook2Id =: PbEntryId];
    priceBookList.addAll(priceBookList1);
  if(priceBookList.size()==0)
  {
    PriceBook2 standardPriceBook=[SELECT id,name FROM PriceBook2 where Name = 'Standard'];
    PricebookEntry objPBEntry = new PricebookEntry(Pricebook2Id = standardPriceBook.Id, Product2Id= d,UnitPrice=2300,IsActive=true);
   
    priceBookList.add(objPBEntry);
    system.debug(objPBEntry);
    system.debug('in If');
    insert priceBookList;
   // update
  }
  
  }
  system.debug('outside');
  system.debug('priceBookList'+priceBookList);
 for(PriceBookEntry pb:priceBookList)
 {
  OpportunityLineItem  obj = new OpportunityLineItem(OpportunityId = oppId,PricebookEntryId = pb.Id,Quantity = 3,TotalPrice = 120000);
  oplist.add(obj);
 }
 system.debug(oplist);
 insert oplist;

 return true;
   }
  
   
   
   @AuraEnabled
   public static void updateRevenue(String recId)
   {
      Account acc = new Account();
      acc.id = recId;
      acc.AnnualRevenue = 15000;
      update acc;
   }
}