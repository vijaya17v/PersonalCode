public with sharing class RatingController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getRating(String rating)

    {
        system.debug(rating);
         return [SELECT 
               Id,Name,Rating
              FROM Account 
             WHERE  Rating =: rating

          ];
    }
}