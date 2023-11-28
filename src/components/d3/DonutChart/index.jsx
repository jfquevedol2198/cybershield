import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { RiskLevel } from "../../../utils/risk";
import { DonutChartDataType } from "../../../utils/types";

const DonutChart = ({ width, height, data, innerRadius, outerRadius }) => {
  const svgRef = useRef();
  const arc = d3.arc().padAngle(Math.PI / 200);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("path").remove();
    svg.selectAll("text").remove();

    let startAngle = 0;
    const totalValue = data.reduce((sum, d) => sum + d.value, 0);

    const parsedData = [];
    data
      .sort(
        (a, b) => RiskLevel[b.riskLevel].order - RiskLevel[a.riskLevel].order
      )
      .forEach((d) => {
        parsedData.push({
          innerRadius,
          outerRadius,
          startAngle: startAngle,
          endAngle: startAngle + (2 * Math.PI * d.value) / totalValue,
          value: d.value,
          riskLevel: d.riskLevel,
        });
        startAngle += (2 * Math.PI * d.value) / totalValue;
      });
    console.log(parsedData);

    svg
      .selectAll("arcOuter")
      .data(parsedData)
      .enter()
      .append("path")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("d", (d) => arc(d))
      .attr(
        "fill",
        (d) => `var(--risk-color-${RiskLevel[d.riskLevel].color.slice(-1)})`
      );
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 5)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "1.5rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text(() => `${totalValue}`);
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-3)")
      .attr("font-size", "0.625rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text(() => "Vulnerabilities");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

DonutChart.propTypes = DonutChartDataType;

export default DonutChart;
