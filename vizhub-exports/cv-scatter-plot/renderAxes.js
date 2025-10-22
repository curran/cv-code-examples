import { axisBottom, axisLeft } from 'd3';
import { renderAxisLabels } from './renderAxisLabels.js';

export const renderAxes = (
  selection,
  {
    xScale,
    yScale,
    width,
    height,
    margin,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset = 10,
    yAxisLabelOffset = 20,
  },
) => {
  // Update x-axis using data join
  const xAxis = axisBottom(xScale);
  selection
    .selectAll('.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr(
      'transform',
      `translate(0,${height - margin.bottom})`,
    )
    .call(xAxis);

  // Update y-axis using data join
  const yAxis = axisLeft(yScale);
  selection
    .selectAll('.y-axis')
    .data([null])
    .join('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);

  // Render axis labels
  renderAxisLabels(selection, {
    width,
    height,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
  });
};
