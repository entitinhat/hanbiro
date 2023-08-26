import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";

interface RadialBarProps {
  series: number[];
  label?: string;
  [x: string]: any;
}

const RadialBar = (props: RadialBarProps) => {
  const {series, categories, label = '', ...restProps} = props;

  return (
    <ReactApexChart
      type="radialBar"
      height={'98%'}
      width={'100%'}
      series={series}
      options={{
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: [label],
        colors: ALL_COLORS,
      }}
      {...restProps}
    />
  );
};

export default RadialBar;