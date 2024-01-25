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

const StackedAreaChartComponentVul = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef();
  const legendRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://3.128.30.222:8000/vulnerabilities_summary"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data StackedAreaChartVul:", error);
      }
    };

    fetchData();
  }, []);

  const containerWidth = 800;
  const containerHeight = 140;
  const legendWidth = 290;
  const legendHeight = 20;

  const dropdownContainerStyle = {
    position: "absolute",
    top: "-30px",
    right: "-30px",
  };

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const width = containerWidth;
    const height = containerHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 30 };

    const svg = d3
      .select(chartRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);
    const legendSvg = d3
      .select(legendRef.current)
      .attr("width", legendWidth)
      .attr("height", legendHeight);

    // Agrupar y acumular por fecha y status
    const groupedData = Array.from(
      d3.group(data, (d) => new Date(d.archive_date)), // Convertir a objetos Date
      ([archive_date, values]) => ({
        archive_date,
        ...Object.fromEntries(
          d3.rollup(
            values,
            (v) => d3.sum(v, (d) => d.sum_asset_count),
            (d) => d.status
          )
        ),
      })
    );

    // Ordenar las fechas de menor a mayor
    groupedData.sort((a, b) => a.archive_date - b.archive_date);

    const stackKeys = ["Low", "Medium", "High", "Critical"];

    const xScale = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.archive_date))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Configurar el formato de las fechas
    const formatTime = d3.timeFormat("%d/%m");

    // Obtén las fechas únicas para establecer como valores de las marcas del eje X
    const uniqueDates = groupedData.map((d) => d.archive_date);
    xScale.domain(uniqueDates);

    // Configurar las marcas del eje X
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(groupedData.map((d) => d.archive_date))
      .tickFormat((d) => formatTime(d)); // Aplicar el formato personalizado

    const stack = d3
      .stack()
      .keys(stackKeys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(groupedData);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .range([height - margin.bottom, margin.top])
      .nice();

    const area = d3
      .area()
      .x((d) => xScale(d.data.archive_date) + xScale.bandwidth() / 2)
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveBasis);

    svg
      .selectAll(".area")
      .data(series)
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("fill", (d, i) => getColorByStatus(stackKeys[i]))
      .attr("d", area);

    svg
      .selectAll(".area")
      .data(series)
      .enter()
      .append("path")
      .attr("class", "area")
      .attr("fill", (d) => getColorByStatus(d.key))
      .attr("d", area);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "0")
      .attr("dy", "1em")
      .style("fill", "#7c8091")
      .attr("font-size", "0.80rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left})`)
      .call(d3.axisLeft(yScale).ticks(3).tickPadding(-30))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "#4f4f4f")
      .attr("font-size", "1rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300");

    svg.selectAll(".domain, .tick line").remove();

    svg.attr("width", width).attr("height", height);

    const uniqueStatusValues = ["Critical", "High", "Medium", "Low"];
    const legendGap = 25; // Ajusta el valor según tus preferencias
    let accumulatedWidth = 0; // Inicia con un valor mayor

    const legend = legendSvg
      .selectAll(".legend")
      .data(uniqueStatusValues)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d) => {
        const xPos = accumulatedWidth;
        accumulatedWidth +=
          legendSvg.append("text").text(d).node().getComputedTextLength() +
          legendGap;
        return `translate(${xPos}, 0)`;
      });

    legend
      .append("circle")
      .attr("cx", 7.5)
      .attr("cy", 7.5)
      .attr("r", 5)
      .attr("fill", (d) => getColorByStatus(d));

    legend
      .append("text")
      .attr("x", 20)
      .attr("y", 7)
      .attr("dy", ".36em")
      .style("text-anchor", "start")
      .text((d) => d)
      .attr("font-size", "16px")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");
  }, [data, containerWidth, containerHeight]);

  const getColorByStatus = (status) => {
    const colorMap = {
      Critical: "#f42525",
      High: "#f26060",
      Medium: "#ff871c",
      Low: "#fdd252",
    };
    return colorMap[status] || "#b6b9c4";
  };

  return (
    <div style={{ position: "relative" }}>
      <svg ref={chartRef} width={containerWidth} height={containerHeight}></svg>
      <svg
        ref={legendRef}
        style={{ position: "absolute", left: containerWidth - 408, top: -19 }}
      ></svg>
      <div className="w-50" style={dropdownContainerStyle}>
        <DropdownSelect data={Period} onSelect={() => {}} />
      </div>
    </div>
  );
};

export default StackedAreaChartComponentVul;
