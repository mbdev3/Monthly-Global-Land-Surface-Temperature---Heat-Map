import { line, curveNatural, bandwidth } from "d3";

const color = (c) => {
  c = c + 8.66;
  if (c < 2.8) {
    return "#ecf1f8";
  }
  if (c >= 2.8 && c < 3.9) {
    return "#4575B4";
  }
  if (c >= 3.9 && c < 5) {
    return "#74add1";
  }
  if (c >= 5 && c < 6.1) {
    return "#abd9e9";
  }
  if (c >= 6.1 && c < 7.2) {
    return "#e0f3f8";
  }
  if (c >= 7.2 && c < 8.3) {
    return "#ffffbf";
  }
  if (c >= 8.3 && c < 9.5) {
    return "#fee090";
  }
  if (c >= 9.5 && c < 10.6) {
    return "#fdae61";
  }
  if (c >= 10.6 && c < 11.7) {
    return "#f46d43";
  }
  if (c >= 11.7 && c <= 12.8) {
    return "#d73027";
  }
  if (c > 12.8) {
    return "#97221b";
  }
};

export const Marks = ({
  data,
  yScale,
  xScale,

  onMouseEnter,
  onMouseOut,
}) => (
  <g className="mark">
    {data.map((d, i) => {
      return (
        <rect
          className="cell"
          x={xScale(d["year"])}
          y={yScale(d["month"] - 1)}
          width={xScale(2000) - xScale(1999)}
          height={yScale(1)}
          fill={color(d["variance"])}
          onMouseEnter={() => onMouseEnter(d)}
          onMouseOut={() => onMouseOut(null)}
          data-month={d["month"] - 1}
          data-year={d["year"]}
          data-temp={d["variance"]}
        ></rect>
      );
    })}
  </g>
);
