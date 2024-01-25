import axios from "axios";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import DropdownSelect from "../../DropdownSelect";

const Period = [
  {
    label: "Last 7 days",
    value: "last_7_days",
  },
  {
    label: "Last 15 days",
    value: "last_15_days",
  },
  {
    label: "Last month",
    value: "last_month",
  },
];

const StackedAreaChartComponent = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef();
  const legendRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://3.128.30.222:8000/alerts_summary"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const containerWidth = 780;
  const containerHeight = 140;

  const legendStyle = {
    position: "absolute",
    top: "-19px",
    left: "585px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  };

  const dropdownContainerStyle = {
    position: "absolute",
    top: "-30px",
    right: "-35px",
    zIndex: 0,
  };

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const width = containerWidth;
    const height = containerHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formatTime = d3.timeFormat("%d/%m");

    const formattedData = data.map((d) => ({
      ...d,
      archive_date: parseDate(d.archive_date),
    }));
    formattedData.sort((a, b) => d3.ascending(a.archive_date, b.archive_date));

    const xScale = d3
      .scaleBand()
      .domain(formattedData.map((d) => formatTime(d.archive_date)))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const maxY = d3.max(formattedData, (d) => d.total_alerts);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([height - margin.bottom, margin.top]);

    const areaGenerator = d3
      .area()
      .x((d) => xScale(formatTime(d.archive_date)) + xScale.bandwidth() / 2)
      .y0(yScale(0))
      .y1((d) => yScale(d.total_alerts))
      .curve(d3.curveMonotoneX);

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll(".area-group")
      .data([formattedData])
      .enter()
      .append("path")
      .attr("class", "area-group")
      .attr("d", areaGenerator)
      .attr("fill", "#2f80ed");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "0")
      .attr("dy", "1em")
      .style("fill", "#7c8091")
      .attr("font-size", "0.80rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");

    svg.selectAll(".domain, .tick line").remove();

    svg
      .append("g")
      .attr("transform", `translate(${margin.left})`)
      .call(d3.axisLeft(yScale).ticks(3).tickPadding(-20))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "#4f4f4f")
      .attr("font-size", "1rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300");

    svg.selectAll(".domain, .tick line").remove();

    // Crear leyenda
    const legendSvg = d3
      .select(legendRef.current)
      .attr("width", containerWidth)
      .attr("height", 40);

    const uniqueStatusValues = Array.from(
      new Set(formattedData.map((d) => d.status))
    );

    const legendGroup = legendSvg
      .selectAll(".legend-group")
      .data(uniqueStatusValues)
      .enter()
      .append("g")
      .attr("class", "legend-group")
      .attr("transform", (d, i) => `translate(${i * 120}, 0)`);

    legendGroup
      .append("text")
      .attr("x", 20)
      .attr("y", 7)
      .attr("dy", ".36em")
      .style("text-anchor", "start")
      .text((d) => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase())
      .attr("font-size", "16px")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");

    // Actualizar círculos de color según el área pintada
    svg.selectAll(".area-group").each(function () {
      const areaColor = d3.select(this).attr("fill");
      legendSvg
        .select(".legend-group")
        .append("circle")
        .attr("cx", 7.5)
        .attr("cy", 7.5)
        .attr("r", 5)
        .attr("fill", areaColor);
    });
  }, [data, containerWidth, containerHeight]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={chartRef} width={containerWidth} height={containerHeight}></svg>
      <svg ref={legendRef} style={legendStyle}></svg>
      <div className="w-50" style={dropdownContainerStyle}>
        <DropdownSelect data={Period} onSelect={() => {}} />
      </div>
    </div>
  );
};

export default StackedAreaChartComponent;
