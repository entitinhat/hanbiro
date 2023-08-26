import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import BarSimple from "@analytic/main/components/ApexCharts/BarSimple";

const Example = (props: ChartComponentProps) => {
  let chartData: any = { l: [
      ['John', 'Doe'],
      ['Joe', 'Smith'],
      ['Jake', 'Williams'],
      'Amber',
      ['Peter', 'Brown'],
      ['Mary', 'Evans'],
      ['David', 'Wilson'],
      ['Lily', 'Roberts']
    ], s: [21, 22, 10, 28, 16, 21, 13, 30] };

  return <BarSimple series={chartData.s} categories={chartData.l} />;
};

export default Example;
