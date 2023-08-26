import React from "react";
import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";
import {ApexOptions} from "apexcharts";
import {merge} from "lodash";

interface ColumnStackedProps {
  categories: string[];
  series: any[];
  overrideOptions?: ApexOptions;

  [x: string]: any;
}

const ColumnStacked = (props: ColumnStackedProps) => {
  const {categories, overrideOptions, ...restProps} = props;

  let chartOptions: ApexOptions = {
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
  };

  if(overrideOptions){
    chartOptions = merge(chartOptions, overrideOptions);
  }

  return <ReactApexChart
    type="bar"
    height={'98%'}
    width={'98%'}
    options={chartOptions}
    {...restProps}
  />
};

export default ColumnStacked;