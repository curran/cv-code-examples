import { scaleLinear, extent } from 'd3';

export const createScales = ({
  data,
  width,
  height,
  margin,
  xValue,
  yValue,
}) => {
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top]);

  return { xScale, yScale };
};
