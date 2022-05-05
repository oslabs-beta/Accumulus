import * as React from 'react';
import moment from 'moment';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface FnGraphProps {
  data: object[];
  name: string;
  width: string | number;
  height: string | number;
}

const FnGraph = (props: FnGraphProps) => {
  return (
    <>
      <h1 className="flex items-center justify-center">{props.name}</h1>
      <div
        className="chart"
        style={{ width: props.width, height: props.height }}
      >
        <ResponsiveContainer>
          <LineChart
            // @ts-ignore
            data={props.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(14 165 233)"
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor="#fff" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis dataKey="" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={'value'}
              stroke={'blue'}
              fillOpacity={1}
              fill="url(#colorUv)"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FnGraph;
