import { createScales } from './createScales.js';
import { renderCircles } from './renderCircles.js';
import { renderAxes } from './renderAxes.js';

export const viz = (
  svg,
  {
    data,
    width,
    height,
    selectedCircleId,
    onCircleClick,
    xValue,
    yValue,
    xAxisLabel,
    yAxisLabel,
    margin,
    circleRadius,
    circleOpacity,
    xAxisLabelOffset,
    yAxisLabelOffset,
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
  });

  renderCircles(svg, {
    data,
    selectedCircleId,
    onCircleClick,
    xScale,
    yScale,
    xValue,
    yValue,
    circleRadius,
    circleOpacity,
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
