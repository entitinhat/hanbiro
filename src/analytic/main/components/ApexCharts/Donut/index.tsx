import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";
import {ApexOptions} from "apexcharts";
import {merge} from "lodash";

interface DonutProps {
  series: number[];
  categories: string[];
  overrideOptions?: ApexOptions;
  [x: string]: any;
}

const Donut = (props: DonutProps) => {
  const {series, categories, overrideOptions, ...restProps} = props;

  let chartOptions: ApexOptions = {
    theme: {
      mode: 'light',
    },
    noData: {
      text: "No Data",
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    labels: categories,
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return Math.round(parseFloat(val)) + "%"
      },
    },
    colors: ALL_COLORS,
    legend: {
      position: 'right',
    }
  };

  if(overrideOptions){
    chartOptions = merge(chartOptions, overrideOptions);
  }

  return (
    <ReactApexChart
      type="donut"
      height={'95%'}
      width={'95%'}
      series={series}
      options={chartOptions}
      {...restProps}
    />
  );
};

export default Donut;