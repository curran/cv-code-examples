export const renderAxisLabels = (
  selection,
  {
    width,
    height,
    xAxisLabel,
    yAxisLabel,
    xAxisLabelOffset,
    yAxisLabelOffset,
  },
) => {
  selection
    .selectAll('.x-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'x-axis-label axis-label')
    .attr('x', width / 2)
    .attr('y', height - xAxisLabelOffset)
    .text(xAxisLabel);

  selection
    .selectAll('.y-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'y-axis-label axis-label')
    .attr('x', -height / 2)
    .attr('y', yAxisLabelOffset)
    .attr('transform', 'rotate(-90)')
    .text(yAxisLabel);
};
