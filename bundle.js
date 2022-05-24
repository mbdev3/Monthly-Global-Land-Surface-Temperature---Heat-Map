(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var jsonUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(function (data) {
        var baseTemperature = data.baseTemperature;
        var monthlyVariance = data.monthlyVariance;
        setData({
          temp: baseTemperature,
          data: monthlyVariance,
          year: monthlyVariance.map(function (a) { return a["year"]; }),
          month: monthlyVariance.map(function (a) { return a["month"]; }),
        });
      });
    }, []);
    return data;
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      var innerWidth = ref.innerWidth;
      ref.tickFormat;
      var sHeight = ref.sHeight;

      return xScale.ticks().map(function (tickValue) {
      
      return (
        React.createElement( React.Fragment, null,
           React.createElement( 'line', { x1: 0, x2: innerWidth, y1: innerHeight, y2: innerHeight }),
           React.createElement( 'line', {  y1: 0, y2: innerHeight }),
        React.createElement( 'g', {
          className: "tick", key: tickValue, transform: ("translate(" + (xScale(
            tickValue
          )) + ",0)") },
           React.createElement( 'line', {  y1: 0, y2: innerHeight + 10 }),
          React.createElement( 'text', {
            style: { textAnchor: 'middle' }, y: innerHeight + sHeight, dy: "0.71rem" },
            (tickValue)
          )
        )
          )
      );
    });
  };

  var AxisLeft = function (ref) {
      var yScale = ref.yScale;
      var innerWidth = ref.innerWidth;
      var toMonthName = ref.toMonthName;
      var sHeight = ref.sHeight;

      return yScale.domain().map(function (tickValue) {
      return (
        React.createElement( 'g', { className: "tick", transform: ("translate(0," + (yScale(tickValue)) + ")") },
          React.createElement( 'line', { x1: -5, x2: innerWidth }),
          React.createElement( 'text', { key: tickValue, style: { textAnchor: "end" }, x: -15, dy: sHeight + 5 },
            toMonthName(tickValue, "short")
          )
        )
      );
    });
  };

  var color = function (c) {
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

  var Marks = function (ref) {
    var data = ref.data;
    var yScale = ref.yScale;
    var xScale = ref.xScale;
    var onMouseEnter = ref.onMouseEnter;
    var onMouseOut = ref.onMouseOut;

    return (
    React.createElement( 'g', { className: "mark" },
      data.map(function (d, i) {
        return (
          React.createElement( 'rect', {
            className: "cell", x: xScale(d["year"]), y: yScale(d["month"] - 1), width: xScale(2000) - xScale(1999), height: yScale(1), fill: color(d["variance"]), onMouseEnter: function () { return onMouseEnter(d); }, onMouseOut: function () { return onMouseOut(null); }, 'data-month': d["month"] - 1, 'data-year': d["year"], 'data-temp': d["variance"] })
        );
      })
    )
  );
  };

  var a = Array.from(Array(11).keys());
  var colorLegend = function (c) {
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

  var temp = function (c) {
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
  var Legend = function () {
   
    return (
      React.createElement( 'g', { id: "legend" },
        React.createElement( 'line', {
          x1: 0, x2: 25*11, y1: 25.5, y2: 25.5 }),
        React.createElement( 'line', {
          x1: 0, x2: 0, y1: 25.5, y2: 40 }),
        React.createElement( 'line', {
          x1: 25*11, x2: 25*11, y1: 25.5, y2: 40 }),
        a.map(function (d, i) {
          return (
            React.createElement( React.Fragment, null,
              React.createElement( 'rect', {
                width: 25, height: 25, x: 25 * i, y: 0, fill: colorLegend(d) }),
              d > 0 && (
                React.createElement( React.Fragment, null,
                  React.createElement( 'line', {
                    x1: 25 * i, x2: 25 * i, y1: 0, y2: 30 }),
                  React.createElement( 'text', {
                    x: 25 * i, y: 40, textAnchor: "middle" },
                    temp(d)
                  )
                )
              )
            )
          );
        })
      )
    );
  };

  var width = 1200;
  var height = 530;
  var margin = {
    top: 10,
    bottom: 100,
    right: 10,
    left: 100,
  };

  function toMonthName(monthNumber, type) {
    var date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString("en-US", {
      month: type,
    });
  }

  var App = function () {
    var data = useData();
    if (!data) {
      return React__default["default"].createElement( 'pre', null, "loading.." );
    }

    var xValue = function (d) { return d["year"]; };
    var xAxisLabel = "Years";

    var yAxisLabel = "Months";

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.right - margin.left;
    var sHeight = innerHeight / 24;
    var xAxisTickFormat = d3.timeFormat("%Y");

    var xFormatting = function (year, month) {
      return new Date((year + "-" + month + "-01"));
    };

    var xMax = d3.max(data["data"], xValue);
    var xMin = d3.min(data["data"], xValue);
    var xScale = d3.scaleLinear().domain(d3.extent(data["data"], xValue)).range([0, innerWidth]);

    var yValue = function (d) { return d["month"]; };
    var yScale = d3.scaleBand()
      .domain(Array.from(Array(12).keys()))
      .range([0, innerHeight]);

    var onMouseEnter = function (e) {
      var temp = (data["temp"] + e["variance"]).toFixed(1);
      var month = toMonthName(e["month"], "long");
      var year = e["year"];

      tooldiv
        .style("visibility", "visible")
        .html(function () { return (year + " - " + month + "</br>" + temp + " ℃</br>" + (e["variance"].toFixed(1)) + " ℃"); })
        .style("top", event.pageY - 120 + "px")
        .style("left", xScale(year) + margin.left + margin.right + "px")
        .attr("data-year", year);
    };
    var onMouseOut = function (e) {
      tooldiv.style("visibility", "hidden");
    };

    return (
      React__default["default"].createElement( 'section', null,
        React__default["default"].createElement( 'div', { id: "title" },
          React__default["default"].createElement( 'h1', null, "Monthly Global Land-Surface Temperature" ),
          React__default["default"].createElement( 'p', { id: "description" }, (xMin + "-" + xMax + ": base temperature " + (data.temp) + "℃"))
        ),

        React__default["default"].createElement( 'svg', { width: width, height: height },
          React__default["default"].createElement( 'g', { transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
            React__default["default"].createElement( 'g', { id: "x-axis" },
              React__default["default"].createElement( AxisBottom, {
                innerHeight: innerHeight, innerWidth: innerWidth, xScale: xScale, tickFormat: xAxisTickFormat, sHeight: sHeight })
            ),
            React__default["default"].createElement( 'g', { id: "y-axis" },
              React__default["default"].createElement( AxisLeft, {
                yScale: yScale, innerWidth: innerWidth, innerHeight: innerHeight, toMonthName: toMonthName, sHeight: sHeight })
            ),

            React__default["default"].createElement( 'text', { className: "label", textAnchor: "middle", x: innerWidth / 2, y: height - 25 },
              xAxisLabel
            ),
            React__default["default"].createElement( 'text', {
              className: "label", textAnchor: "middle", transform: ("translate(" + (-margin.left / 1.5) + "," + (innerHeight / 2) + ") rotate(-90)") },
              yAxisLabel
            ),
            React__default["default"].createElement( Marks, {
              data: data["data"], xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, innerHeight: innerHeight, innerWidth: innerWidth, tooltip: function (d) { return d; }, xFormatting: xFormatting, onMouseEnter: function (e) { return onMouseEnter(e); }, onMouseOut: function (e) { return onMouseOut(); }, sHeight: sHeight }),
            React__default["default"].createElement( 'g', { transform: ("translate(" + (0) + "," + (innerHeight + 50) + ")") },
              React__default["default"].createElement( Legend, null )
            )
          ),
          React__default["default"].createElement( 'g', { className: "copyright", transform: ("translate(" + (width - 35) + "," + (height - 25) + ") ") },
            React__default["default"].createElement( 'text', { textAnchor: "middle", dx: -15, dy: 18 }, "By"),
            React__default["default"].createElement( 'a', { href: "https://thembdev.com" },
              " ",
              React__default["default"].createElement( 'image', { href: "https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg", width: 25 })
            )
          )
        )
      )
    );
  };

  var rootElement = document.getElementById("root");
  ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3);
//# sourceMappingURL=bundle.js.map
