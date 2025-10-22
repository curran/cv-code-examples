export const renderCircles = (
  selection,
  { data, selectedCircleId, onCircleClick },
) => {
  selection
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 30)
    .attr('fill', (d) =>
      d.id === selectedCircleId ? 'white' : 'black',
    )
    .attr('stroke', (d) =>
      d.id === selectedCircleId ? 'black' : 'none',
    )
    .attr('stroke-width', (d) =>
      d.id === selectedCircleId ? 5 : 0,
    )
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      onCircleClick(d.id);
    });
};
