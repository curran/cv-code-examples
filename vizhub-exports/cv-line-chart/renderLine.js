import { line } from 'd3';

export const renderLine = (
  selection,
  {
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    lineStroke,
    lineColor,
    lineDefinedValue,
  },
) => {
  const lineGenerator = line()
    .defined(lineDefinedValue)
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)));

  selection
    .selectAll('.line')
    .data([data])
    .join('path')
    .attr('class', 'line')
    .attr('d', lineGenerator)
    .attr('fill', 'none')
    .attr('stroke', lineColor)
    .attr('stroke-width', lineStroke);
};
