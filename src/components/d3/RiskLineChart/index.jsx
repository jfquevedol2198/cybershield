import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { RiskLineChartDataType } from "../../../utils/types";

const yAxisDomains = [
  {
    label: "No Risk",
    value: 0,
  },
  {
    label: "Low",
    value: 25,
  },
  {
    label: "Medium",
    value: 50,
  },
  {
    label: "High",
    value: 75,
  },
  {
    label: "Critical",
    value: 100,
  },
];

//chart component
const RiskLineChart = ({ width, height, riskLineData }) => {

  // this function transforms the riskLineData objects into the format that d3 expects
  // { date: "30-01", close: 100 }
  const formattedData = riskLineData.map((d) => {
    return {
      date: removeYearFromDate(d.date_recorded),
      close: d.total_risk || d.total_risk_score_by_site || 0,
    };
  });

  //refs
  const svgRef = useRef();

  const createGradient = (select) => {
    const gradient = select
      .select("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "0%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "10%")
      .attr("style", "stop-color:#D9D9D9;stop-opacity:0");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("style", "stop-color:#B0B8D0;stop-opacity:0.5");
  };

  useEffect(() => {
    var margin = { top: 20, right: 30, bottom: 50, left: 100 };
    const svg = d3.select(svgRef.current);
    svg.selectAll(".dot").remove();
    svg.selectAll(".line").remove();
    svg.selectAll("text").remove();
    svg.selectAll("path").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("defs");
    svg.call(createGradient);

    const parseTime = d3.timeParse("%d/%m");
    const parsedData = formattedData.map((d) => ({
      close: d.close,
      date: parseTime(d.date),
    }));
    
    const xScale = d3
      .scaleTime()
      .domain([
        d3.min(parsedData, (v) => v.date),
        d3.max(parsedData, (v) => v.date),
      ])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    svg
      .selectAll(".dot")
      .data(parsedData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.close))
      .attr("r", 5)
      .attr("fill", `var(--gray-color-4)`);
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.close));
    svg
      .selectAll(".line")
      .data([parsedData])
      .enter()
      .append("path")
      .attr("d", (d) => {
        const lineValues = line([
          ...d,
          { date: d[d.length - 1].date, close: 0 },
        ]).slice(1);
        const splitedValues = lineValues.split(",");
        return `M${margin.left},${height - margin.bottom},${lineValues},l${0},${
          splitedValues[splitedValues.length]
        }`;
      })
      .style("fill", "url(#gradient)");

    svg
      .selectAll(".line")
      .data([parsedData])
      .enter()
      .append("path")
      .attr("d", (d) => line(d))
      .attr("stroke-width", "2")
      .style("fill", "none")
      .style("filter", "url(#glow)")
      .attr("stroke", `var(--gray-color-4)`)
      .attr("stroke-width", 3);

    svg
      .selectAll("xLabel")
      .data(formattedData.map((d) => d.date))
      .enter()
      .append("text")
      .attr("x", (d) => xScale(parseTime(d)))
      .attr("y", 230)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "1rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text((d) => d);
    svg
      .selectAll("yLabel")
      .data(yAxisDomains)
      .enter()
      .append("text")
      .attr("x", 65)
      .attr("y", (d) => yScale(d.value) + 15)
      .attr("text-anchor", "end")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "1rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text((d) => d.label);
  }, [width, riskLineData]);

  if (!riskLineData || riskLineData.length === 0) {
    return <div style={{ color: 'red' }}>No risk data available.</div>;
  }

  return <svg ref={svgRef}></svg>;
};

RiskLineChart.propTypes = RiskLineChartDataType;
RiskLineChart.defaultProps = {
  width: 500,
  height: 250,
  riskLineData: [],
};

export default RiskLineChart;


function removeYearFromDate(dateString) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    // eslint-disable-next-line no-unused-vars
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}`;
  } else {
    // Handle invalid date format
    console.error('Invalid date format. Please use "YYYY-MM-DD".');
    return null;
  }
}
