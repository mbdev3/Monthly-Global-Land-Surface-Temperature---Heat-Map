const a = Array.from(Array(11).keys());
const colorLegend = (c) => {
  switch (c) {
    case 0:
      return '#ecf1f8';
    case 1:
      return '#4575B4';
    case 2:
      return '#74add1';
    case 3:
      return '#abd9e9';
    case 4:
      return '#e0f3f8';
    case 5:
      return '#ffffbf';
    case 6:
      return '#fee090';
    case 7:
      return '#fdae61';
    case 8:
      return '#f46d43';
    case 9:
      return '#d73027';
    case 10:
      return '#97221b';
  }
};

const temp = (c) => {
  switch (c) {
    case 1:
      return '2.8';
    case 2:
      return '3.9';
    case 3:
      return '5.0';
    case 4:
      return '6.1';
    case 5:
      return '7.2';
    case 6:
      return '8.3';
    case 7:
      return '9.5';
    case 8:
      return '10.6';
    case 9:
      return '11.7';
    case 10:
      return '12.8';
  }
};
export const Legend = () => {
 
  return (
    <g id="legend">
      <line
        x1={0 }
        x2={25*11 }
        y1={25.5}
        y2={25.5}
      />
      <line
        x1={0}
        x2={0 }
        y1={25.5}
        y2={40}
      />
      <line
        x1={25*11}
        x2={25*11 }
        y1={25.5}
        y2={40}
      />
      {a.map((d, i) => {
        return (
          <>
            <rect
              width={25}
              height={25}
              x={25 * i}
              y={0}
              fill={colorLegend(d)}
            />
            {d > 0 && (
              <>
                <line
                  x1={25 * i}
                  x2={25 * i}
                  y1={0}
                  y2={30}
                />
                <text
                  x={25 * i}
                  y={40}
                  textAnchor="middle"
                >
                  {temp(d)}
                </text>
              </>
            )}
          </>
        );
      })}
    </g>
  );
};
