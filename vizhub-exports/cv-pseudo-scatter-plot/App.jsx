import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import { data } from './data.js';
import { viz } from './viz.js';

export const App = () => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    viz(select(ref.current), { data, width, height });
  }, []);

  return (
    <div className="container">
      <svg ref={ref}></svg>
    </div>
  );
};
