public  class RgpBreakupController {
    @AuraEnabled(cacheable= true)
    public static List<RGP_Break_Up__c> getRgpBreakupVal(String rgpId){
        try {
        
            return [Select Name,breakup_Status__c,Required_Qty__c,Materials__c,Break_up_Details__c from RGP_Break_Up__c where RGP_Line_Item__c =: rgpId ];
            
        } catch (Exception e) {
            system.error(e.getMessage());
        }
    }
}