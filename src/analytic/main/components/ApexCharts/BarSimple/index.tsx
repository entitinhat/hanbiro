import ReactApexChart from "react-apexcharts";
import {merge} from "lodash";
import {ALL_COLORS} from "@analytic/main/config/colors";
import {ApexOptions} from "apexcharts";

interface BarSimpleProps {
  series: any[];
  categories: string[];
  multipleColumn?: boolean;
  overrideOptions?: ApexOptions;
  options?: ApexOptions;
  [x: string]: any;
}

const BarSimple = (props: BarSimpleProps) => {
  const {series, categories, overrideOptions, multipleColumn = false, ...restProps} = props;

  var optimalColumnWidthPercent = 20 + (60 / (1 + 30 * Math.exp(-(categories?.length ?? 0) / 3)));

  let baseOptions = {
    chart: {
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        distributed: false,
        columnWidth: optimalColumnWidthPercent + '%',
        // horizontal: false,
        // ...(categories?.length < 5 ? {columnWidth: multipleColumn ? '30%' : '20%'} : {})
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ALL_COLORS,
    xaxis: {
      categories
    }
  };

  if (!!overrideOptions) {
    baseOptions = merge(baseOptions, overrideOptions)
  }

  return (
    <ReactApexChart
      type="bar"
      height={'98%'}
      width={'100%'}
      series={multipleColumn ? series : [
        {
          name: "Total",
          data: series
        }
      ]}
      options={baseOptions}
      {...restProps}
    />
  );
};

export default BarSimple;