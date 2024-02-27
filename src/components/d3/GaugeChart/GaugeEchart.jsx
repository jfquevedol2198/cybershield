import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";
import { useMemo } from "react";

//data
const dataOuter = [
  {
    value: 25,
    color: "--risk-color-4",
  },
  {
    value: 25,
    color: "--risk-color-3",
  },
  {
    value: 25,
    color: "--risk-color-2",
  },
  {
    value: 25,
    color: "--risk-color-1",
  },
];

const GaugeEchart = ({ percent }) => {
  const option = useMemo(() => {
    return {
      series: [
        {
          type: "pie",
          radius: ["170%", "180%"],
          center: ["50%", "100%"],
          // adjust the start angle
          startAngle: 180,
          labelLine: {
            show: false,
          },
          data: [
            ...dataOuter.map((data) => ({
              value: data.value,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                // stop the chart from rendering this piece
                color: `var(${data.color})`,
                decal: {
                  symbol: "none",
                },
              },
            })),
            {
              // make an record to fill the bottom 50%
              value: 100,
              itemStyle: {
                // stop the chart from rendering this piece
                color: "none",
                decal: {
                  symbol: "none",
                },
              },
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              series: {
                visible: false,
              },
            },
          ],
        },
        {
          name: "Access From",
          type: "pie",
          radius: ["140%", "165%"],
          center: ["50%", "100%"],
          // adjust the start angle
          startAngle: 180,
          data: [
            {
              value: percent,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                // stop the chart from rendering this piece
                color: `var(--risk-color-1)`,
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              value: 100 - percent,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                // stop the chart from rendering this piece
                color: `var(--gray-color-2)`,
                decal: {
                  symbol: "none",
                },
              },
            },
            {
              // make an record to fill the bottom 50%
              value: 100,
              itemStyle: {
                // stop the chart from rendering this piece
                color: "none",
                decal: {
                  symbol: "none",
                },
              },
              label: {
                show: false,
              },
            },
          ],
        },
      ],
    };
  }, [percent]);

  return (
    <ReactEcharts
      option={option}
      style={{ height: "100px", left: 0, top: 0, width: "200px" }}
      opts={{ renderer: "svg" }}
    />
  );
};

GaugeEchart.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default GaugeEchart;
