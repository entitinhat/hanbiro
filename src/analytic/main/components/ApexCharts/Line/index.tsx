import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";

interface LineProps {
  series: number[];
  categories: string[];
  [x: string]: any;
}

const Line = (props: LineProps) => {
  const {series, categories, ...restProps} = props;

  return (
    <ReactApexChart
      type="line"
      height={'98%'}
      width={'100%'}
      series={series}
      options={{
        chart: {
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        xaxis: {
          categories
        },
        colors: ALL_COLORS,
      }}
      {...restProps}
    />
  );
};

export default Line;