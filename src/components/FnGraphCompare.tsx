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

interface FnGraphCompareProps {
  onFunctions: Record<string, string>;
  name: string;
  width: string | number;
  data: any[];
  unit?: string;
}

const FuncGraphCompare = (props: FnGraphCompareProps) => {
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
        strokeWidth={2}
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
              right: 50,
              left: 30,
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
            <XAxis dataKey="xkey" />
            <YAxis dataKey="" unit={props.unit} tickCount={10} domain={['dataMin', 'dataMax']}/>
            <Tooltip />
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default FuncGraphCompare;
