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
  tooltip: string;
  data: object[];
  name: string;
  width: string | number;
  unit?: string;
}

const FnGraph = (props: FnGraphProps) => {
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
      <div className="chart" style={{ width: props.width }}>
        <ResponsiveContainer height={225}>
          <LineChart
            // @ts-ignore
            // width={auto}
            height={200}
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
            <XAxis dataKey="xkey" />
            <YAxis unit={props.unit} dataKey="" />
            <Tooltip />
            <Line
              name={props.tooltip}
              type="monotone"
              dataKey={'value'}
              stroke={'#000000'}
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
