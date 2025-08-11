// See https://aka.ms/new-console-template for more information
using Orestes.Simulator.WebAPI.Security;
using Orestes.SharedLibrary;
using System.Diagnostics;

UtilsForMessages.EventLog("Info", "Starting Orestes.Simulator...");

string phrase = "Orestes.Simulator-SharedLibrary-v1.0.0";

#region Compress/Decompress

//string compressed = UtilsForMessages.Compress(phrase);
//UtilsForMessages.EventLog("Info", $"Compressed: {compressed}.");
//string decompressed = UtilsForMessages.Decompress(compressed);
//UtilsForMessages.EventLog("Info", $"Decompressed: {decompressed}.");

#endregion

#region Serialize/Deserialize

//string serialized = UtilsForMessages.SerializeObject<string>(phrase);
//UtilsForMessages.EventLog("Info", $"Serialized: {serialized}.");
//var deserialized = UtilsForMessages.DeserializeObject<string>(serialized);
//UtilsForMessages.EventLog("Info", $"Deserialized: {deserialized}.");

#endregion

#region Masked Message

//string message = UtilsForMessages.MaskedwithTimestamp(phrase, "Info", "Desktop", "CMD");
//Console.WriteLine(message);

#endregion

UtilsForMessages.EventLog("Info", "End of process.");


