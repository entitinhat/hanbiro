import React from "react";
import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";

interface BarStackedProps {
  categories: string[];
  series: any[];

  [x: string]: any;
}

const BarStacked = (props: BarStackedProps) => {
  const {series, categories, ...restProps} = props;

  const columnState: any = {
    series,
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        },
      },
      colors: ALL_COLORS,
      xaxis: {
        categories
      }
    },
  };

  return <ReactApexChart
    type="bar"
    height={'98%'}
    width={'98%'}
    options={columnState.options}
    series={columnState.series}
    {...restProps}
  />
};

export default BarStacked;