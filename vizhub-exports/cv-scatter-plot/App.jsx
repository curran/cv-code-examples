import React, { useRef, useState, useEffect } from 'react';
import { useContainerDimensions } from './useContainerDimensions.js';
import { select, csv } from 'd3';
import { viz } from './viz.js';

export const App = () => {
  const divRef = useRef(null);
  const svgRef = useRef(null);
  const [selectedCircleId, setSelectedCircleId] =
    useState(null);
  const [data, setData] = useState([]);

  const dimensions = useContainerDimensions(divRef);

  useEffect(() => {
    csv('data.csv').then((loadedData) => {
      // Convert string values to numbers and add id
      const parsedData = loadedData.map((d, i) => ({
        id: i,
        sepal_length: +d.sepal_length,
        sepal_width: +d.sepal_width,
        petal_length: +d.petal_length,
        petal_width: +d.petal_width,
        species: d.species,
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
      selectedCircleId,
      onCircleClick: setSelectedCircleId,
      xValue: (d) => d.sepal_length,
      yValue: (d) => d.sepal_width,
      xAxisLabel: 'Sepal Length',
      yAxisLabel: 'Sepal Width',
      margin: {
        top: 25,
        right: 50,
        bottom: 50,
        left: 69,
      },
      circleRadius: 8,
      circleOpacity: 0.3,
      xAxisLabelOffset: 10,
      yAxisLabelOffset: 30,
    });
  }, [selectedCircleId, dimensions, data, svgRef]);

  return (
    <div ref={divRef} className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
};
