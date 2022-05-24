import React from "react";
import ReactDOM from "react-dom";
import { useData } from "./useData";
import { AxisBottom } from "./axisBottom";
import { AxisLeft } from "./axisLeft";
import { Marks } from "./Marks";
import { Legend } from "./legend";
import { scaleLinear, max, min, extent, timeFormat, scaleBand } from "d3";

const width = 1200;
const height = 530;
const margin = {
  top: 10,
  bottom: 100,
  right: 10,
  left: 100,
};

function toMonthName(monthNumber, type) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", {
    month: type,
  });
}

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>loading..</pre>;
  }

  const xValue = (d) => d["year"];
  const xAxisLabel = "Years";

  const yAxisLabel = "Months";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;
  const sHeight = innerHeight / 24;
  const xAxisTickFormat = timeFormat("%Y");

  const xFormatting = (year, month) => {
    return new Date(`${year}-${month}-01`);
  };

  const xMax = max(data["data"], xValue);
  const xMin = min(data["data"], xValue);
  const xScale = scaleLinear().domain(extent(data["data"], xValue)).range([0, innerWidth]);

  const yValue = (d) => d["month"];
  const yScale = scaleBand()
    .domain(Array.from(Array(12).keys()))
    .range([0, innerHeight]);

  const onMouseEnter = (e) => {
    let temp = (data["temp"] + e["variance"]).toFixed(1);
    let month = toMonthName(e["month"], "long");
    let year = e["year"];
    tooldiv
      .style("visibility", "visible")
      .html(() => `${year} - ${month}</br>${temp} ℃</br>${e["variance"].toFixed(1)} ℃`)
      .style("top", yScale(e["month"]) - innerHeight / 12 + "px")
      .style("left", xScale(e["year"]) + 100 + "px")
      .attr("data-year", year);
  };
  const onMouseOut = (e) => {
    tooldiv.style("visibility", "hidden");
  };

  return (
    <>
      <div id="title">
        <h1>Monthly Global Land-Surface Temperature</h1>
        <p id="description">{`${xMin}-${xMax}: base temperature ${data.temp}℃`}</p>
      </div>

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g id="x-axis">
            <AxisBottom
              innerHeight={innerHeight}
              innerWidth={innerWidth}
              xScale={xScale}
              tickFormat={xAxisTickFormat}
              sHeight={sHeight}
            />
          </g>
          <g id="y-axis">
            <AxisLeft
              yScale={yScale}
              innerWidth={innerWidth}
              innerHeight={innerHeight}
              toMonthName={toMonthName}
              sHeight={sHeight}
            />
          </g>

          <text className="label" textAnchor="middle" x={innerWidth / 2} y={height - 25}>
            {xAxisLabel}
          </text>
          <text
            className="label"
            textAnchor="middle"
            transform={`translate(${-margin.left / 1.5},${innerHeight / 2}) rotate(-90)`}
          >
            {yAxisLabel}
          </text>
          <Marks
            data={data["data"]}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            tooltip={(d) => d}
            xFormatting={xFormatting}
            onMouseEnter={(e) => onMouseEnter(e)}
            onMouseOut={(e) => onMouseOut(e)}
            sHeight={sHeight}
          />
          <g transform={`translate(${0},${innerHeight + 50})`}>
            <Legend />
          </g>
        </g>
        <g className="copyright" transform={`translate(${width - 35},${height - 25}) `}>
          <text textAnchor="middle" dx={-15} dy={18}>
            By
          </text>
          <a xlink:href="https://thembdev.com">
            {" "}
            <image xlink:href="https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg" width={25} />
          </a>
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
