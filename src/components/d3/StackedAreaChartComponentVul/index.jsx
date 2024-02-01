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
  const containerRef = useRef();  // Nuevo ref para el contenedor
  const [selectedPeriod, setSelectedPeriod] = useState(Period[0].value); // Estado para el periodo seleccionado

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

  // Mover la función filterDataByPeriod aquí
  const filterDataByPeriod = (dataset, period) => {
    const endDate = new Date();
    let startDate = new Date();

    switch (period) {
      case "last_7_days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "last_15_days":
        startDate.setDate(endDate.getDate() - 14);
        break;
      case "last_month":
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      default:
        return dataset;
    }

    return dataset.filter(d => {
      const date = new Date(d.archive_date);
      return date >= startDate && date <= endDate;
    });
  };


  const containerWidth = 780;
  const containerHeight = 140;

  const legendStyle = {
    position: "absolute",
    top: "12px",
    left: "-290px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  };

  const dropdownContainerStyle = {
    position: "absolute",
    top: "-30px",
    right: 0,
    zIndex: 0,
  };

  useEffect(() => {
    if (!chartRef.current || data.length === 0 || !containerRef.current) return;

    const getTickValuesForLastMonth = (dates) => {
      const startDate = new Date(dates[0]);  // Utilizar la primera fecha como inicio
      const endDate = d3.max(dates, (d) => new Date(d));
      const tickValues = [];

      // Incluir la última fecha
      tickValues.push(endDate);

      // Restar fechas de 5 en 5 días hasta la primera fecha
      for (let date = new Date(endDate); date > startDate; date.setDate(date.getDate() - 5)) {
        tickValues.push(new Date(date));
      }

      // Incluir la primera fecha si no es igual a la anterior
      if (tickValues[tickValues.length - 1] > startDate) {
        tickValues.push(startDate);
      }

      return tickValues.reverse();  // Invertir el orden para que sea ascendente
    };

    // Filtrar los datos basándose en el periodo seleccionado
    const filteredData = filterDataByPeriod(data, selectedPeriod);

    const width = containerRef.current.clientWidth; // Obtener el ancho del contenedor
    const height = containerHeight;
    const margin = { top: 20, right: 20, bottom: 40, left: 30 };

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", chartRef)
      .attr("height", height);

    const legendSvg = d3
      .select(legendRef.current)
      .attr("width", width)
      .attr("height", height);

    // Agrupar y acumular por fecha y status
    const groupedData = Array.from(
      d3.group(filteredData, (d) => new Date(d.archive_date)), // Convertir a objetos Date
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
    const uniqueDates = groupedData.map((d) => new Date(d.archive_date));
    xScale.domain(uniqueDates);

    // Configurar las marcas del eje X
    let tickValues;
    if (selectedPeriod === 'last_month') {
      tickValues = getTickValuesForLastMonth(uniqueDates);
    } else {
      tickValues = uniqueDates;
    }

    // Configurar las marcas del eje X
    const xAxis = d3.axisBottom(xScale)
      .tickValues(tickValues)
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
      .append("text")
      .attr("x", 20)
      .attr("y", 7)
      .attr("dy", ".36em")
      .style("text-anchor", "start")
      .text((d) => d)
      .attr("font-size", "16px")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");

    legend
      .append("circle")
      .attr("cx", 7.5)
      .attr("cy", 7.5)
      .attr("r", 5)
      .attr("fill", (d) => getColorByStatus(d));


  }, [data, containerRef, containerWidth, containerHeight, selectedPeriod]);

  // Función para manejar la selección del periodo desde el menú desplegable
  const handleSelectPeriod = (value) => {
    setSelectedPeriod(value);
  };

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
    <div style={{ position: "relative", width: "100%" }} ref={containerRef}>
      <svg ref={chartRef} width={containerWidth} height={containerHeight}></svg>
      <div className="w-50" style={dropdownContainerStyle}>
        <svg ref={legendRef} style={legendStyle}></svg>
        <DropdownSelect data={Period} onSelect={e => handleSelectPeriod(e.value)} />
      </div>
    </div>
  );
};

export default StackedAreaChartComponentVul;