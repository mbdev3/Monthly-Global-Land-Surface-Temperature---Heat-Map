export const AxisBottom = ({
  xScale,
  innerHeight,
  innerWidth,
  tickFormat,
  sHeight
}) =>
  xScale.ticks().map((tickValue) => {
    
    return (
      <>
         <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} />
         <line  y1={0 } y2={innerHeight} />
      <g
        className="tick"
        key={tickValue}
        transform={`translate(${xScale(
          tickValue
        )},0)`}
      >
         <line  y1={0 } y2={innerHeight + 10} />
        <text
          style={{ textAnchor: 'middle' }}
          y={innerHeight + sHeight}
          dy="0.71rem"
        >
          {(tickValue)}
        </text>
      </g>
        </>
    );
  });
