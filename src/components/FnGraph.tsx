import * as React from 'react';
import moment from 'moment';
import { dummyData } from '../../Data/dummyData';

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

const FnGraph = (props: any) => {
  const arr: Array<object> = [];
  const lines = [];
  for (const func in props.onFunctions) {
    lines.push(
      <Line
        type="monotone"
        dataKey={func}
        stroke={props.onFunctions[func]}
        fillOpacity={1}
        fill="url(#colorUv)"
        activeDot={{ r: 6 }}
      />
    );
  }

  return (
    <>
      <h1 className="flex items-center justify-center">
        Invocations over time
      </h1>
      <div className="chart" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            // @ts-ignore
            data={dummyData}
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
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FnGraph;
