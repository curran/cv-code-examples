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
      // Convert string values to numbers
      const parsedData = loadedData.map((d) => ({
        id: +d.id,
        x: +d.x,
        y: +d.y,
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
    });
  }, [selectedCircleId, dimensions, data, svgRef]);

  return (
    <div ref={divRef} className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
};
