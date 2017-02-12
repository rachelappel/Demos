# AzureNewsFlash Azure Functions App

This app consists of two Azure functions. The first contains an HTTP trigger that fires the **Subscribe** function, which inserts the request data into an Azure Storage Table.
The second function scans that Azure Storage Table on a timer and sends an email using SendGrid to each person listed in it. 