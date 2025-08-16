using Orestes.SharedLibrary.Enums;

namespace Orestes.SharedLibrary.PictureMaker.Models
{
    public class DerivedData
    {
        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; } = string.Empty;        
        /// <summary>
        /// 
        /// </summary>
        public IList<PlotItem>? PlotItems { get; set; }
    }
}
