import ReactApexChart from "react-apexcharts";
import {ALL_COLORS} from "@analytic/main/config/colors";

interface TreemapProps {
  series: any[];

  [x: string]: any;
}

const TreeMap: React.FC<TreemapProps> = (props: TreemapProps) => {
  const {series, ...restProps} = props;

  const options: any = {
    legend: {
      show: false
    },
    chart: {
      toolbar: {
        show: false,
      },
      distributed: true
    },
    colors: ALL_COLORS,
  }

  return <ReactApexChart
    type="treemap"
    width={'100%'}
    height={400}
    options={options}
    series={series}
    {...restProps}
  />
}

export default TreeMap;