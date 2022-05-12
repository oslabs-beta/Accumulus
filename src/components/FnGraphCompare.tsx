import * as React from 'react';
import moment from 'moment';
// import { dummyData } from '../../Data/byFunc/dummyData';

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

const FuncGraphCompare = (props: any) => {
  console.log('fngraphcompare props.data', props.data);
  const lines = [];
  for (const func in props.onFunctions) {
    lines.push(
      <Line
        type="monotone"
        dataKey={func}
        key={func}
        stroke={props.onFunctions[func]}
        fillOpacity={1}
        fill="url(#colorUv)"
        activeDot={{ r: 6 }}
      />
    );
  }

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
      <div className="chart" style={{ width: props.width, height: 300 }}>
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
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FuncGraphCompare;
