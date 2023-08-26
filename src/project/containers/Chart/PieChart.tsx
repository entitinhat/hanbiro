import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ReactApexChart, { Props as ChartProps } from 'react-apexcharts';

const pieChartOptions = {
  chart: {
    type: 'pie',
    width: 250,
    height: 250
  },
  labels: ['Todo', 'Doing', 'Done'],
  legend: {
    show: true,
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4
    }
  }
  // responsive: [
  //   {
  //     breakpoint: 450,
  //     chart: {
  //       width: 280,
  //       height: 280
  //     },
  //     options: {
  //       legend: {
  //         show: false,
  //         position: 'bottom'
  //       }
  //     }
  //   }
  // ]
};

// ==============================|| APEXCHART - PIE ||============================== //

const PieChart = () => {
  const theme = useTheme();
  const { primary } = theme.palette.text;
  const line = theme.palette.divider;
  const grey200 = theme.palette.grey[200];
  const backColor = theme.palette.background.paper;

  const [series] = useState([44, 55, 13]);
  const [options, setOptions] = useState<ChartProps>(pieChartOptions);

  const secondary = theme.palette.primary[700];
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.main;
  const error = theme.palette.error.main;
  const orangeDark = theme.palette.warning.main;

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [primaryMain, successDark, error],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      },
      stroke: {
        colors: [backColor]
      }
    }));
  }, [primary, line, grey200, backColor, primaryMain, successDark, error]);

  return (
    <div id="pie-chart">
      <ReactApexChart options={options} series={series} type="pie" />
    </div>
  );
};

export default PieChart;
