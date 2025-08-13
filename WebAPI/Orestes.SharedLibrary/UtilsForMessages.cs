using Orestes.SharedLibrary.enums;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Orestes.SharedLibrary
{
    /// <summary>
    /// 
    /// </summary>
    public static class UtilsForMessages
    {
        #region Public Functions

        public const string StandardDateTimeFormat = "yyyy-MM-dd_HH:mm:ss:fff";

        /// <summary>
        /// Compresses a string and returns a deflate compressed, Base64 encoded string.
        /// </summary>
        /// <param name="uncompressedString">String to compress</param>
        public static string Compress(string uncompressedString)
        {
            byte[] compressedBytes;

            using (var uncompressedStream = new MemoryStream(Encoding.UTF8.GetBytes(uncompressedString)))
            {
                using (var compressedStream = new MemoryStream())
                {
                    // setting the leaveOpen parameter to true to ensure that compressedStream will not be closed when compressorStream is disposed
                    // this allows compressorStream to close and flush its buffers to compressedStream and guarantees that compressedStream.ToArray() can be called afterward
                    // although MSDN documentation states that ToArray() can be called on a closed MemoryStream, I don't want to rely on that very odd behavior should it ever change
                    using (var compressorStream = new DeflateStream(compressedStream, CompressionLevel.Optimal, true))
                    {
                        uncompressedStream.CopyTo(compressorStream);
                    }

                    // call compressedStream.ToArray() after the enclosing DeflateStream has closed and flushed its buffer to compressedStream
                    compressedBytes = compressedStream.ToArray();
                }
            }

            return Convert.ToBase64String(compressedBytes);
        }

        /// <summary>
        /// Decompresses a deflate compressed, Base64 encoded string and returns an uncompressed string.
        /// </summary>
        /// <param name="compressedString">String to decompress.</param>
        public static string Decompress(string compressedString)
        {
            byte[] decompressedBytes;

            var compressedStream = new MemoryStream(Convert.FromBase64String(compressedString));

            using (var decompressorStream = new DeflateStream(compressedStream, CompressionMode.Decompress))
            {
                using (var decompressedStream = new MemoryStream())
                {
                    decompressorStream.CopyTo(decompressedStream);

                    decompressedBytes = decompressedStream.ToArray();
                }
            }

            return Encoding.UTF8.GetString(decompressedBytes);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string SerializeObject<T>(T obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static T? DeserializeObject<T>(string obj)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(obj);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entryType"></param>
        /// <param name="message"></param>
        public static void EventLog(enmLogLevel entryType, string message)
        {
            Console.WriteLine(MaskedwithTimestamp(message, entryType.ToString()));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="method"></param>
        /// <param name="message"></param>
        /// <param name="recipient"></param>
        /// <param name="node"></param>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static string MaskedwithTimestamp(string message, string logLevel = "", string sender = "", string recipient = "", DateTime? dateTime = null)
        {
            if (!string.IsNullOrEmpty(logLevel)) logLevel = $"[{logLevel}]";
            if (!string.IsNullOrEmpty(sender)) sender = $"{sender}: ";
            if (!string.IsNullOrEmpty(recipient)) recipient = $" -> {recipient}";
            if (dateTime == null) dateTime = DateTime.Now;

            return $"{logLevel} {((DateTime)dateTime).ToString(StandardDateTimeFormat)} {sender}{message}{recipient}";
        }

        #endregion
    }
}
