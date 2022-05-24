import { useState, useEffect } from "react";
import { json } from "d3";
const jsonUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then((data) => {
      const { baseTemperature, monthlyVariance } = data;
      setData({
        temp: baseTemperature,
        data: monthlyVariance,
        year: monthlyVariance.map((a) => a["year"]),
        month: monthlyVariance.map((a) => a["month"]),
      });
    });
  }, []);
  return data;
};
