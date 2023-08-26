import React from "react";
import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";
import {merge} from "lodash";

interface BarHorizontalProps {
  categories: string[];
  series: any[];
  [x: string]: any;
}

const BarHorizontal = (props: BarHorizontalProps) => {
  const {categories, series, options, ...restProps} = props;

  let baseOptions = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '10',
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ALL_COLORS,
    xaxis: {
      categories
    }
  };

  if (!!options){
    baseOptions = merge(baseOptions, options)
  }

  return <ReactApexChart
    type="bar"
    height={'98%'}
    width={'98%'}
    series={[
      {
        name: "Total",
        data: series
      }
    ]}
    options={baseOptions}
    {...restProps}
  />
};

export default BarHorizontal;