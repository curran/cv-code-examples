import { createScales } from './createScales.js';
import { renderLine } from './renderLine.js';
import { renderAxes } from './renderAxes.js';

export const viz = (
  svg,
  {
    data,
    width,
    height,
    xValue,
    yValue,
    xAxisLabel,
    yAxisLabel,
    margin,
    lineStroke,
    lineColor,
    xAxisLabelOffset,
    yAxisLabelOffset,
    lineDefinedValue,
  },
) => {
  svg.attr('width', width).attr('height', height);

  const { xScale, yScale } = createScales({
    data,
    width,
    height,
    margin,
    xValue,
    yValue,
    lineDefinedValue,
  });

  renderLine(svg, {
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    lineStroke,
    lineColor,
    lineDefinedValue,
  });

  renderAxes(svg, {
    xScale,
    yScale,
    width,
    height,
    margin,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
  });
};
