import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { StackedAreaChartDataType } from "../../../utils/types";

const StackedAreaChart = ({ width, height, data, colors }) => {
  const svgRef = useRef();

  const getYaxisLabels = (max) => {
    const n = parseInt(`${max}`.charAt(0));
    const m = Math.floor(Math.log10(max));
    const p = n * Math.pow(10, m);
    return [0, p / 2, p];
  };

  useEffect(() => {
    const margin = {
      top: 20,
      left: 90,
      right: 20,
      bottom: 30,
    };
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("path").remove();
    svg.selectAll("text").remove();
    //////////
    // GENERAL //
    //////////

    // List of groups = header of the csv files
    const keys = Object.keys(data[0]).slice(1);
    // color palette

    //stack the data?
    const stackedData = d3.stack().keys(keys)(data);

    //////////
    // AXIS //
    //////////
    const parseTime = d3.timeParse("%d/%m");

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return parseTime(d.date);
        })
      )
      .range([margin.left, width - margin.right]);

    // Add X axis label:
    svg
      .append("text")
      .attr("text-anchor", "start")
      .attr("x", width)
      .attr("y", height - margin.bottom)
      .text("Time (year)");

    // Add Y axis label:
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20)
      .text("# of baby born")
      .attr("text-anchor", "start");

    // Add Y axis
    const maxValue = d3.max(data, (d) =>
      Object.keys(d)
        .slice(1)
        .reduce((sum, v) => sum + d[v], 0)
    );
    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([height - margin.bottom, margin.top]);

    // Create the scatter variable: where both the circles and the brush take place
    const areaChart = svg.append("g").attr("clip-path", "url(#clip)");

    // Area generator
    const area = d3
      .area()
      .x(function (d) {
        return x(parseTime(d.data.date));
      })
      .y0(function (d) {
        return y(d[0]);
      })
      .y1(function (d) {
        return y(d[1]);
      });

    // What to do when one group is hovered
    const highlight = function (event, d) {
      // reduce opacity of all groups
      d3.selectAll(".myArea").style("opacity", 0.5);
      // expect the one that is hovered
      d3.select("." + d.key.split(" ").join("_")).style("opacity", 1);
      console.log("hover");
    };

    // And when it is not hovered anymore
    const noHighlight = function () {
      d3.selectAll(".myArea").style("opacity", 1);
    };
    // Show the areas
    areaChart
      .selectAll("mylayers")
      .data(stackedData)
      .join("path")
      .attr("class", function (d) {
        return "myArea " + d.key.split(" ").join("_");
      })
      .style("fill", function (d) {
        return `var(${colors[d.key]})`;
      })
      .attr("d", area)
      .on("mouseover", highlight)
      .on("mouseleave", noHighlight);
    svg
      .selectAll("xLabel")
      .data(stackedData[0])
      .enter()
      .append("text")
      .attr("x", (d) => x(parseTime(d.data.date)))
      .attr("y", height - 3)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--gray-color-3)")
      .attr("font-size", "0.75rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text((d) => d.data.date);
    svg
      .selectAll("yLabel")
      .data(getYaxisLabels(maxValue))
      .enter()
      .append("text")
      .attr("x", 65)
      .attr("y", (d) => y(d))
      .attr("text-anchor", "end")
      .attr("fill", "var(--gray-color-5)")
      .attr("font-size", "1rem")
      .attr("font-family", "Roboto")
      .attr("font-weight", "300")
      .text((d) => d);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

StackedAreaChart.propTypes = StackedAreaChartDataType;

export default StackedAreaChart;
