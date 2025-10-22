import React, { useState, useEffect } from 'react';

export const useContainerDimensions = (divRef) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(divRef.current);

    return () => resizeObserver.disconnect();
  }, [divRef]);

  return dimensions;
};
