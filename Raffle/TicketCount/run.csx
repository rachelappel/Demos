#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log, IQueryable<Ticket> ticketsTable)
{
    //test
    var count = GetRaffleItemCount(req,ticketsTable);
    return req.CreateResponse(HttpStatusCode.OK, new {
        Count = count.ToString()
    });
}

public static int GetRaffleItemCount(HttpRequestMessage req, IQueryable<Ticket> ticketsTable)
{

    string prizes = req.GetQueryNameValuePairs()
    .FirstOrDefault(q => string.Compare(q.Key, "prizes", true) == 0)
    .Value;

    int count = 0;
    foreach (Ticket t in ticketsTable)
    {
        count++;        
    }

    count = (count / Convert.ToInt32(prizes));  // raffle an item for every 25 tickets
    return count;
}



public class Ticket : TableEntity {
    public string TicketNumber {get;set;}
    public DateTime DateAndTime {get;set;}
    public bool Selected {get;set;}
}