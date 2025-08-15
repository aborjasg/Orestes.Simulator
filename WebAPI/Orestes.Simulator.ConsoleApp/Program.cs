// See https://aka.ms/new-console-template for more information
using Orestes.SharedLibrary;
using Orestes.SharedLibrary.enums;
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

#region Orestes.Library

var matrix = FakeData.GetNcpData();
UtilsForMessages.EventLog(enmLogLevel.Info, $"matrix: {matrix}");

#endregion

UtilsForMessages.EventLog(enmLogLevel.Info, "End of process.");


