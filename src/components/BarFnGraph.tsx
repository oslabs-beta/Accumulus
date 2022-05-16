import * as React from 'react';
import moment from 'moment';
import { dummyData } from '../../Data/byFunc/dummyData';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const barColors = ['#850909', '#8e2222', '#d82e2e', '#d25757', '#e728'];

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
          color: '#232323',
        }}
      >
        {props.name}
      </h1>
      <div
        className="chart"
        style={{ width: props.width, height: props.height }}
      >
        <ResponsiveContainer height={200}>
          <BarChart
            // @ts-ignore
            data={props.data}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs></defs>
            <CartesianGrid vertical={true} strokeDasharray="5 5" />
            <YAxis
              type="category"
              dataKey="name"
              interval={0}
              textAnchor="end"
              tick={{ fill: 'transparent' }}
            />
            <XAxis type="number" dataKey="value" />
            <Tooltip />
            <Bar type="monotone" dataKey="value" fill="#613659">
              {props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
              <LabelList
                dataKey="name"
                fill="#fff"
                position="insideLeft"
                offset={5}
                angle={0}
                dx="0"
                dy="0"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarFuncGraph;
