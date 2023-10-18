public class ContactController {
    @AuraEnabled
    public static String newContact(String lastName,String mobile,Id accountId)
    {
      Contact obj =  new Contact();
      obj.LastName = lastName;
      obj.MobilePhone = mobile;
      obj.AccountId =accountId;
      
      insert obj;
      return obj.id;
    }
    @AuraEnabled(cacheable=true)
   public static List<Contact> getAccountContactList(String accountId){
    return  [SELECT 
    LastName,MobilePhone
             FROM Contact 
             WHERE  AccountId =: accountId
         ];
   }
   @AuraEnabled
    public static String newContactCr(String lastName,String BirthName,String Email,String Department)
    {
      Contact obj =  new Contact();
     obj.LastName = lastName;
      obj.Email = Email;
      obj.Department =Department;
      
      insert obj;
      system.debug(obj);
      return obj.id;
    }

    @AuraEnabled(cacheable=true)
    public static List<Receipt__c> getRecieptContactList(String contactId){
     return  [SELECT 
     Name,Amount__c,Mode_Of_Pay__c,AmountPaidDate__c
              FROM Receipt__c
              WHERE  	Contact__c =: contactId
          ];
    }
  
}