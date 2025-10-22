import { scaleLinear, scaleTime, extent } from 'd3';

export const createScales = ({
  data,
  width,
  height,
  margin,
  xValue,
  yValue,
  lineDefinedValue,
}) => {
  const xDomain = extent(data, xValue);

  const xScale = scaleTime()
    .domain(xDomain)
    .range([margin.left, width - margin.right]);

  const filteredData = lineDefinedValue
    ? data.filter(lineDefinedValue)
    : data.filter((d) => yValue(d) !== -99.99);

  const yScale = scaleLinear()
    .domain(extent(filteredData, yValue))
    .range([height - margin.bottom, margin.top]);

  return { xScale, yScale };
};
