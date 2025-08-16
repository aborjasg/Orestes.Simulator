using Orestes.SharedLibrary.PictureMaker.Models;
using SkiaSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Orestes.SharedLibrary.PictureMaker
{
    public class PlotterNCP : PlotBase, IPlotEngine
    {
        public PlotterNCP()
        {

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plotTemplate"></param>
        /// <param name="plotItem"></param>
        public new void SetUpLayout(PlotTemplate plotTemplate, PlotItem plotItem)
        {
            plotTemplate.FrameSize = new float[] { Constants.NUM_COLS * plotTemplate.StrokeWidth, Constants.NUM_ROWS * plotTemplate.StrokeWidth };
            base.SetUpLayout(plotTemplate, plotItem);
        }
    }
}
