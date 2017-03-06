#r "Newtonsoft.Json"
#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Net;
using Newtonsoft.Json;

public static async Task<object> Run(HttpRequestMessage req, TraceWriter log, ICollector<Ticket> tickets)
{    

    Random random = new Random();
    int randomNumber = random.Next(95000, 96000);
    log.Info(randomNumber.ToString());

    // add generated numbers to table; select from table later
    tickets.Add(
        new Ticket() { 
            PartitionKey = "Tickets", 
            RowKey =  DateTime.Now.ToString("ddHHmmssffff"), 
            TicketNumber = randomNumber.ToString(),
            DateAndTime = DateTime.Now,
            Selected = false
            }
        );

    return req.CreateResponse(HttpStatusCode.OK, new {
        ticket = randomNumber.ToString()
    });
}

public class Ticket : TableEntity {
    public string TicketNumber {get;set;}
    public DateTime DateAndTime {get;set;}
    public bool Selected {get;set;}
}
