export const AxisLeft = ({ yScale, innerWidth, toMonthName, sHeight }) =>
  yScale.domain().map((tickValue) => {
    return (
      <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
        <line x1={-5} x2={innerWidth} />
        <text key={tickValue} style={{ textAnchor: "end" }} x={-15} dy={sHeight + 5}>
          {toMonthName(tickValue, "short")}
        </text>
      </g>
    );
  });
