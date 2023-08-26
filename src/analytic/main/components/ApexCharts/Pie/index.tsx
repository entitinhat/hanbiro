import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";
import {ApexOptions} from "apexcharts";
import {merge} from "lodash";

interface PieProps {
  series: number[];
  categories: string[];
  overrideOptions?: ApexOptions;
  [x: string]: any;
}

const Pie = (props: PieProps) => {
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
      formatter: (val: any) => {
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
      type="pie"
      height={'95%'}
      width={'95%'}
      series={series}
      options={chartOptions}
      {...restProps}
    />
  );
};

export default Pie;