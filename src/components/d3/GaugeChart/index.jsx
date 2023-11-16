import * as d3 from "d3";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";

//data
const dataOuter = [
  {
    innerRadius: 70,
    outerRadius: 75,
    startAngle: -Math.PI / 2,
    endAngle: -Math.PI / 4,
    color: "--risk-color-1",
  },
  {
    innerRadius: 70,
    outerRadius: 75,
    startAngle: -Math.PI / 4,
    endAngle: 0,
    color: "--risk-color-2",
  },
  {
    innerRadius: 70,
    outerRadius: 75,
    startAngle: 0,
    endAngle: Math.PI / 4,
    color: "--risk-color-3",
  },
  {
    innerRadius: 70,
    outerRadius: 75,
    startAngle: Math.PI / 4,
    endAngle: Math.PI / 2,
    color: "--risk-color-4",
  },
];

const GaugeChart = ({ percent }) => {
  const svgRef = useRef();
  const arc = d3.arc().padAngle(Math.PI / 200);

  const dataInner = useMemo(
    () => [
      {
        innerRadius: 58,
        outerRadius: 68,
        startAngle: -Math.PI / 2,
        endAngle: -Math.PI / 2 + (percent / 100) * Math.PI,
        color: "--risk-color-4",
      },
      {
        innerRadius: 58,
        outerRadius: 68,
        startAngle: -Math.PI / 2 + (percent / 100) * Math.PI,
        endAngle: Math.PI / 2,
        color: "--gray-color-2",
      },
    ],
    [percent]
  );

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", 200)
      .attr("height", 100);
    svg.selectAll("path").remove().selectAll("text").remove();
    svg
      .selectAll("arcOuter")
      .data(dataOuter)
      .enter()
      .append("path")
      .attr("transform", "translate(100, 75)")
      .attr("d", (d) => arc(d))
      .attr("fill", (d) => `var(${d.color})`);
    svg
      .append("text")
      .attr("x", 100)
      .attr("y", 73)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "2.5rem")
      .attr("line-height", "2.5rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text(() => `${percent}%`);
    svg
      .append("text")
      .attr("x", 35)
      .attr("y", 90)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "0.75rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text(() => `0%`);
    svg
      .append("text")
      .attr("x", 168)
      .attr("y", 90)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "0.75rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text(() => `100%`);
    svg
      .selectAll("arcInner")
      .data(dataInner)
      .enter()
      .append("path")
      .attr("transform", "translate(100, 75)")
      .attr("d", (d) => arc(d))
      .attr("fill", (d) => `var(${d.color})`);
  }, []);

  return <svg ref={svgRef}></svg>;
};

GaugeChart.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default GaugeChart;
