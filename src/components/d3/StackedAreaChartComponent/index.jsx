import axios from "axios";
import * as d3 from "d3";
import { useEffect, useRef, useState, useCallback } from "react";
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
  const [selectedPeriod, setSelectedPeriod] = useState(Period[0].value);
  const chartRef = useRef();
  const legendRef = useRef();
  const [legendData, setLegendData] = useState([]);
  const containerRef = useRef();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Función para actualizar el tamaño de la ventana
  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    // Agregar el manejador de eventos de redimensionamiento
    window.addEventListener("resize", updateWindowSize);

    // Limpiar el manejador de eventos al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [updateWindowSize]);

  useEffect(() => {
    const fetchData = async (period) => {
      try {
        const response = await axios.get(
          "http://3.128.30.222:8000/alerts_summary"
        );
        let filteredData = response.data;

        // Asumiendo que tus datos ya vienen ordenados por fecha,
        // de lo contrario, necesitarás ordenarlos antes de filtrar.
        if (period === 'last_7_days') {
          filteredData = filteredData.slice(-7);
        } else if (period === 'last_15_days') {
          filteredData = filteredData.slice(-15);
        } else if (period === 'last_month') {
          filteredData = filteredData.slice(-30); // Asegúrate de tener al menos 30 días de datos
        }

        setData(filteredData);

        // Extraer los estados únicos para las leyendas
        const statuses = new Set(filteredData.map(d => d.status));
        setLegendData(Array.from(statuses)); // asumiendo que tienes un estado llamado legendData para esto
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const handlePeriodSelect = (selectedOption) => {
    setSelectedPeriod(selectedOption.value);
  };

  const containerWidth = 780 // 780
  const containerHeight = 140;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };

  useEffect(() => {
    if (!chartRef.current || data.length === 0 || !containerRef.current) return;

    // const width = windowSize.width;
    const width = containerRef.current.clientWidth; // Obtener el ancho del contenedor
    const height = containerHeight;

    // Limpia el gráfico anterior antes de dibujar uno nuevo
    d3.select(chartRef.current).selectAll("*").remove();

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formatTime = d3.timeFormat("%d/%m");

    const formattedData = data.map((d) => ({
      ...d,
      archive_date: parseDate(d.archive_date),
    }));
    formattedData.sort((a, b) => d3.ascending(a.archive_date, b.archive_date));

    // Filtrar las fechas para mostrar solo cada quinta fecha en el eje x si el período seleccionado es 'last_month'
    const shouldFilterDates = selectedPeriod === 'last_month';
    let displayDates; // Fechas que se mostrarán en el eje X
    let areaDataGraph; // Datos para el área del gráfico

    if (shouldFilterDates) {
      // Crear un conjunto de datos que incluya todas las fechas para el área del gráfico
      areaDataGraph = formattedData;

      // Crear un conjunto de fechas para mostrar en el eje X que sea cada quinta fecha
      displayDates = areaDataGraph.filter((_, i) => i % 5 === 0).map(d => formatTime(d.archive_date));
      // Asegúrate de incluir la última fecha si no está en el filtro
      if (formatTime(areaDataGraph[areaDataGraph.length - 1].archive_date) !== displayDates[displayDates.length - 1]) {
        displayDates.push(formatTime(areaDataGraph[areaDataGraph.length - 1].archive_date));
      }
    } else {
      // Si no es "Last month", mostrar todas las fechas tanto en el área como en el eje X
      areaDataGraph = formattedData;
      displayDates = formattedData.map((d) => formatTime(d.archive_date));
    }
    const xScale = d3
      .scaleBand()
      .domain(formattedData.map((d) => formatTime(d.archive_date))) // Usa todas las fechas aquí
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const areaData = shouldFilterDates
      ? formattedData.filter((d, i) => i % 5 === 0)
      : formattedData;


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

    // Crear leyenda
    const legendSvg = d3
      .select(legendRef.current)
      .attr("width", width)
      .attr("height", height);


    svg
      .selectAll(".area-group")
      .data([formattedData]) // Usa formattedData aquí
      .enter()
      .append("path")
      .attr("class", "area-group")
      .attr("d", areaGenerator)
      .attr("fill", "#2f80ed");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .tickValues(displayDates) // Usa displayDates aquí para las tickValues
      )
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dx", "0")
      .attr("dy", "1em")
      .style("fill", "#7c8091")
      .attr("font-size", "0.80rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "100");
    console.log("Area Path for Last Month:", areaGenerator(formattedData));


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


  }, [data, containerRef, containerHeight, windowSize, selectedPeriod]);

  return (
    <div style={{ position: "relative", width: "100%" }} ref={containerRef}>
      <svg ref={chartRef} width={containerWidth} height={containerHeight}></svg>

      {/* Leyendas */}
      <div style={{ position: 'absolute', right: '70px', top: '-21px', display: 'flex' }}>
        {legendData.map(status => {
          // Cambia el estado para que la primera letra sea mayúscula y el resto minúscula
          const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
          return (
            <div key={status} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <span style={{ display: 'block', width: '10px', height: '10px', backgroundColor: '#2f80ed', borderRadius: "50%" }}></span>
              <span style={{ marginLeft: '5px' }}>{formattedStatus}</span>
            </div>
          );
        })}
      </div>

      {/* DropdownSelect*/}
      <div className="w-50" style={{ position: "absolute", top: "-30px", right: "-5px" }}>
        <DropdownSelect data={Period} onSelect={handlePeriodSelect} />
      </div>
    </div>
  );
};

export default StackedAreaChartComponent;