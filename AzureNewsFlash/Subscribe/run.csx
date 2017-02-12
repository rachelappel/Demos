using System;
using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, ICollector<Subscription> outputTable, TraceWriter log)
{    

    string name = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
        .Value;

    string email = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "email", true) == 0)
        .Value;

    outputTable.Add(
        new Subscription() { 
            PartitionKey = "Subscription", 
            RowKey =  DateTime.Now.ToString("ddHHmmssffff"), 
            Name = name,
            Email = email 
            }
        );

    // Get request body
    dynamic data = await req.Content.ReadAsAsync<object>();

    // Set name to query string or body data
    name = name ?? data?.name;
    email = email ?? data?.email;

    return name == null
        ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
        : req.CreateResponse(HttpStatusCode.OK, $"Hello {name} {email}");
}

public class Subscription
{
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
