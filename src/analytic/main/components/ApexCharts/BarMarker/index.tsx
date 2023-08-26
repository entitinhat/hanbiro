import ReactApexChart from "react-apexcharts";
import React from "react";
import {merge} from "lodash";
import {ALL_COLORS} from "@analytic/main/config/colors";

interface BarMarkerProps {
  series: any[];
  categories: string[];
  [x: string]: any;
}

const BarMarker = (props: BarMarkerProps) => {
  const {series, categories, options, ...restProps} = props;

  let baseOptions = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        distributed: false,
        horizontal: false,
        columnWidth: '20%',
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: categories,
    },
    dataLabels: {
      enabled: false
    },
    colors: ALL_COLORS,
  };

  if (!!options){
    baseOptions = merge(baseOptions, options)
  }

  return (
    <ReactApexChart
      type="bar"
      height={'98%'}
      width={'100%'}
      series={series}
      options={baseOptions}
      {...restProps}
    />
  );
};

export default BarMarker;