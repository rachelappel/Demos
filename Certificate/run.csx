using System.Net;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log, string inputBlob)
{
    string name = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
        .Value;

    string course = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "course", true) == 0)
        .Value;        

     var nameBlob = inputBlob.Replace("{NAME}",name);
     var courseBlob = nameBlob.Replace("{COURSE}",course);
     var finalBlob = courseBlob.Replace("{DATE}",DateTime.Now.ToLongDateString());
 
    return req.CreateResponse(HttpStatusCode.OK, new {
        certificate = finalBlob
    });
        
}