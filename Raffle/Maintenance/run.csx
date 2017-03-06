#r "Microsoft.WindowsAzure.Storage"
using Microsoft.WindowsAzure.Storage.Table;
using System;

public static void Run(string input, TraceWriter log, ICollector<Ticket> ticketsTable, IQueryable<Ticket> ticketsInputTable)
{
  foreach (Ticket t in ticketsInputTable)
    { 
         t.Selected = false;
         ticketsTable.Add(t);    
    }
}



public class Ticket : TableEntity {
    public string TicketNumber {get;set;}
    public DateTime DateAndTime {get;set;}
    public bool Selected {get;set;}
}