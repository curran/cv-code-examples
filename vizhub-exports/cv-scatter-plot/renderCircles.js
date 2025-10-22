export const renderCircles = (
  selection,
  {
    data,
    selectedCircleId,
    onCircleClick,
    xScale,
    yScale,
    xValue,
    yValue,
    circleRadius,
    circleOpacity,
  },
) => {
  selection
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('r', circleRadius)
    .attr('fill', (d) =>
      d.id === selectedCircleId ? 'white' : 'black',
    )
    .attr('stroke', (d) =>
      d.id === selectedCircleId ? 'black' : 'none',
    )
    .attr('stroke-width', (d) =>
      d.id === selectedCircleId ? 4 : 0,
    )
    .style('cursor', 'pointer')
    .style('opacity', circleOpacity)
    .on('click', (event, d) => {
      onCircleClick(d.id);
    });
};
