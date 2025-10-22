import { renderCircles } from './renderCircles.js';

export const viz = (svg, { data, width, height }) => {
  svg.attr('width', width).attr('height', height);
  renderCircles(svg, { data });
};
