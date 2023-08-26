import React from "react";
import ReactApexChart from "react-apexcharts";
import {COLOR_DEFAULT, COLOR_EXTRA} from "@analytic/main/config/colors";
import {merge} from "lodash";

interface MixedMultipleYProps {
  categories: string[];
  series: any[];
  title?: string;

  [x: string]: any;
}

const MixedMultipleY = (props: MixedMultipleYProps) => {
  const {categories = [], series = [], title, options, ...restProps} = props;

  let baseOptions: any = {
    chart: {
      type: 'line',
      stacked: false,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1, 4]
    },
    xaxis: {
      categories,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          formatter: (val: number) => {
            return val.toFixed(0);
          }
        },
        tooltip: {
          enabled: true
        }
      }
    ],
    colors: [...COLOR_DEFAULT, ...COLOR_EXTRA],
    tooltip: {
      fixed: {
        enabled: true,
        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        offsetY: 30,
        offsetX: 60
      },
    },
    legend: {
      horizontalAlign: 'center',
    }
  };

  if (!!options){
    baseOptions = merge(baseOptions, options)
  }

  if (!!title) {
    baseOptions.title = {
      text: title,
      align: 'center'
    };
  }

  return <ReactApexChart
    type="line"
    width={'100%'}
    height={'98%'}
    options={baseOptions}
    series={series}
    {...restProps}
  />
};

export default MixedMultipleY;