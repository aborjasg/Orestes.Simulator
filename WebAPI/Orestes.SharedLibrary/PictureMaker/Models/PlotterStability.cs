﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Orestes.SharedLibrary.PictureMaker.Models;
using Orestes.SharedLibrary.Enums;

namespace Orestes.SharedLibrary.PictureMaker
{
    public class PlotterStability : PlotBase, IPlotEngine
    {
        public PlotterStability() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="plotTemplate"></param>
        /// <param name="plotItem"></param>
        public new void SetUpLayout(PlotTemplate plotTemplate, PlotItem plotItem)
        {
            switch (plotTemplate.PlotType)
            {
                case enmPlotType.heatmap_stability:
                case enmPlotType.ncp:
                    {
                        plotTemplate.FrameSize = new float[] { Constants.NUM_COLS * plotTemplate.StrokeWidth, Constants.NUM_ROWS * plotTemplate.StrokeWidth };

                        break;
                    }
                case enmPlotType.histogram_stability:
                    {
                       

                        break;
                    }
            }
            base.SetUpLayout(plotTemplate, plotItem);
        }
    }
}
