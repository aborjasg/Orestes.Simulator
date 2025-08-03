// See https://aka.ms/new-console-template for more information
using Orestes.Simulator.WebAPI.Security;

Console.WriteLine("Orestes.Simulator");

var auth = new Authentication(new ServerInfo());
var token = auth.GenerateAccessToken("testuser");
Console.WriteLine($"token ={token}");
