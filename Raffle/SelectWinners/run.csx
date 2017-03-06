#r "Microsoft.WindowsAzure.Storage"
#r "Newtonsoft.Json"

using System;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Table;

public static HttpResponseMessage Run(HttpRequestMessage req, TraceWriter log, IQueryable<Ticket> Tickets, ICollector<Ticket> SelectedTickets)
{    
    List<string> tickets= new List<string>();
    
    string skipURL = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "skip", true) == 0)
        .Value;

    int skip = 25;   // every 25th row is default
    if (skipURL != "" && skipURL != null) 
        { skip = Convert.ToInt32(skipURL); }  
       

    int counter = 1; 
    foreach (Ticket t in Tickets)
    {  if (!t.Selected) 
        {
            counter++;
          
            if (counter % skip == 0) 
            {
                // for JSON response
                tickets.Add(t.TicketNumber);
                // update azure storage
                t.Selected = true;
                SelectedTickets.Add(t);
            }
        }        
    }

    dynamic data = JsonConvert.SerializeObject(tickets);
    log.Info(data);

    return req.CreateResponse(HttpStatusCode.OK, new {
        Tickets = data
    });

}

public class Ticket : TableEntity {
    public string TicketNumber {get;set;}
    public DateTime DateAndTime {get;set;}
    public bool Selected {get;set;}
}