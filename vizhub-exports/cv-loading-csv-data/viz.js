import { renderCircles } from './renderCircles.js';

export const viz = (
  svg,
  { data, width, height, selectedCircleId, onCircleClick },
) => {
  svg.attr('width', width).attr('height', height);
  renderCircles(svg, {
    data,
    selectedCircleId,
    onCircleClick,
    width,
    height,
  });
};
