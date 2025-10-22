import React, { useRef, useState, useEffect } from 'react';
import { useContainerDimensions } from './useContainerDimensions.js';
import { select, csv } from 'd3';
import { viz } from './viz.js';

export const App = () => {
  const divRef = useRef(null);
  const svgRef = useRef(null);
  const [data, setData] = useState([]);

  const dimensions = useContainerDimensions(divRef);

  useEffect(() => {
    csv('data.csv').then((loadedData) => {
      // Convert string values to numbers and add id
      const parsedData = loadedData.map((d, i) => ({
        id: i,
        year: +d.Yr,
        month: +d.Mn,
        co2: +d.CO2,
      }));
      setData(parsedData);
    });
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0)
      return;
    if (data.length === 0) return;

    viz(select(svgRef.current), {
      data,
      width: dimensions.width,
      height: dimensions.height,
      xValue: (d) => new Date(d.year, d.month - 1), // Month is 0-indexed in JS
      yValue: (d) => d.co2,
      xAxisLabel: 'Date',
      yAxisLabel: 'CO2 Levels',
      margin: {
        top: 25,
        right: 50,
        bottom: 50,
        left: 69,
      },
      lineStroke: 2,
      lineColor: 'black',
      xAxisLabelOffset: 10,
      yAxisLabelOffset: 30,
      lineDefinedValue: (d) => d.co2 !== -99.99,
    });
  }, [dimensions, data, svgRef]);

  return (
    <div ref={divRef} className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
};
