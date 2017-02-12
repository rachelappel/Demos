#r "Microsoft.Azure.WebJobs.Extensions.SendGrid"
#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System;

using SendGrid.Helpers.Mail;

public static Mail Run(TimerInfo myTimer, IQueryable<Subscription> inputTable, TraceWriter log, out Mail message)
{   
    message = new Mail
    {        
        Subject = "Azure news"          
    };
    Content content = new Content
    {
        Type = "text/plain",
        Value = "Breaking news! Azure Functions are a hit with developers! " + 
                "They're easy and fun to create, and just as easy and fun to maintain!"
    };

    var personalization = new Personalization();
    personalization.AddTo(new Email("azurefunctions99@contoso.com"));
    
    foreach (Subscription sub  in inputTable)
    {
        personalization.AddBcc(new Email(sub.Email));
        log.Info($"Email sent to name: {sub.Name} {sub.Email}");
    }

    message.AddContent(content);
    message.AddPersonalization(personalization);

    return message;
}

public class Subscription : TableEntity
{
    // public string PartitionKey { get; set; }
    // public string RowKey { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}