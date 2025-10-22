import { scaleLinear } from 'd3';

export const renderCircles = (
  selection,
  { data, selectedCircleId, onCircleClick, width, height },
) => {
  const xScale = scaleLinear()
    .domain([0, 960])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, 500])
    .range([0, height]);

  selection
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xScale(d.x))
    .attr('cy', (d) => yScale(d.y))
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
