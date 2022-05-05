import * as React from 'react';
import moment from 'moment';
import { dummyData } from '../../Data/byFunc/dummyData';

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

interface BarFnGraphProps {
  data: Record<string, any>[];
  name: string;
  width: string | number;
  height: string | number;
}

const BarFuncGraph = (props: BarFnGraphProps) => {
  const bars: any[] = [];
  props.data.map((el) => {
    bars.push(<Bar type="monotone" dataKey="value" fill="#8884d8" />);
  });

  return (
    <>
      <h1
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '300',
          color: 'black',
        }}
      >
        {props.name}
      </h1>
      <div
        className="chart"
        style={{ width: props.width, height: props.height }}
      >
        <ResponsiveContainer>
          <BarChart
            // @ts-ignore
            data={props.data}
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
            <Bar type="monotone" dataKey="value" fill="#613659" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarFuncGraph;
