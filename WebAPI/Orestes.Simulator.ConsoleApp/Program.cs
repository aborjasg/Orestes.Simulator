// See https://aka.ms/new-console-template for more information
using Orestes.SharedLibrary;
using Orestes.SharedLibrary.Enums;
using Orestes.SharedLibrary.PictureMaker.Models;
using Orestes.Simulator.WebAPI.Security;
using System;
using System.Diagnostics;

UtilsForMessages.EventLog(enmLogLevel.Info, "Starting Orestes.Simulator...");

string phrase = "Orestes.Simulator-SharedLibrary-v1.0.*";

#region Compress/Decompress

//string compressed = UtilsForMessages.Compress(phrase);
//UtilsForMessages.EventLog(enmLogLevel.Info, $"Compressed: {compressed}.");
//string decompressed = UtilsForMessages.Decompress(compressed);
//UtilsForMessages.EventLog(enmLogLevel.Info, $"Decompressed: {decompressed}.");

#endregion

#region Serialize/Deserialize

//string serialized = UtilsForMessages.SerializeObject<string>(phrase);
//UtilsForMessages.EventLog(enmLogLevel.Info, $"Serialized: {serialized}.");
//var deserialized = UtilsForMessages.DeserializeObject<string>(serialized);
//UtilsForMessages.EventLog(enmLogLevel.Info, $"Deserialized: {deserialized}.");

#endregion

#region Masked Message

//string message = UtilsForMessages.MaskedwithTimestamp(phrase, "Info", "Desktop", "CMD");
//Console.WriteLine(message);

#endregion

#region Orestes.SharedLibrary

var orchestration = new Orestes.SharedLibrary.PictureMaker.Orchestration();
var sourceData = orchestration.getSourceData(new Orestes.SharedLibrary.PictureMaker.Models.DerivedDataFilter 
{ 
    Name = "Combined NCP (Miniature)" 
});
UtilsForMessages.EventLog(enmLogLevel.Info, $"getSourceData: {UtilsForMessages.SerializeObject<ActionResponse>(sourceData)}");

var processData = orchestration.processData(new Orestes.SharedLibrary.PictureMaker.Models.DerivedDataFilter
{
    Name = "Combined NCP (Miniature)",
    CompressedData = sourceData.Content
});
UtilsForMessages.EventLog(enmLogLevel.Info, $"processData: {UtilsForMessages.SerializeObject<ActionResponse>(processData)}");
//UtilsForMessages.EventLog(enmLogLevel.Info, $"imageString: {orchestration.getImageString(processData.Content)}");

#endregion

UtilsForMessages.EventLog(enmLogLevel.Info, "End of process.");


