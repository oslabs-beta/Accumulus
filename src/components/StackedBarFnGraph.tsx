import * as React from 'react';
import moment from 'moment';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StackedBarFnGraphProps {
  onStacked: any[];
  name: string;
  width: number | string;
  height: number | string;
}

const StackedBarFuncGraph = (props: StackedBarFnGraphProps) => {
  const bars: any[] = [];

  props.onStacked.map((el) => {
    console.log(el);
    bars.push(
      // <div key={el.name}>
      <>
        <Bar
          key={`allo${el.name}`}
          type="monotone"
          dataKey={`allo${el.name}`}
          stackId="a"
          fill={el.color}
        />
        <Bar
          key={`diff${el.name}`}
          type="monotone"
          dataKey={`diff${el.name}`}
          stackId="a"
          fill="grey"
        />
      </>
      // </div>
    );
  });

  return (
    <>
      <h1 className="flex items-center justify-center">{props.name}</h1>
      <div
        className="chart"
        style={{ width: props.width, height: props.height }}
      >
        <ResponsiveContainer>
          <BarChart
            // @ts-ignore
            data={props.onStacked}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs></defs>
            <CartesianGrid vertical={true} strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis dataKey="" />
            <Tooltip />
            {bars}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default StackedBarFuncGraph;
