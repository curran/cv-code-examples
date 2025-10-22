import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { select } from 'd3';

const App = () => {
  const ref = useRef(null);

  useEffect(() => {
    select(ref.current).text('Hello D3 & React');
  }, []);

  return <div ref={ref} className="message"></div>;
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
