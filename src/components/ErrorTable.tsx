import React from 'react';
import styled from 'styled-components';
import { errorMessagesMock } from '.././../Data/byFunc/errorMessagesMock';
import {
  ErrorTableTable,
  ErrorTableRow,
  ErrorTableCell,
  ErrorTableDiv,
} from '../styles';

interface ErrorTableProps {
  data: any[];
}

interface LogInfo {
  funcName: string;
  id: string | number;
  date: string;
  message: string;
}

//MOVE TO STYLES PAGE ONCE DONE
const Table = styled.table`
  width: 100%;
  background: white;
  border: 1px solid black;
  box-sizing: border-box;
  border-collapse: collapse;
  color: black;
`;
// how do I get it to scroll for overflow?
// overflow: scroll;

//WHEN FETECHING, REMEMBER TO ADD props:ErrorProps
const ErrorTable = (props: ErrorTableProps) => {
  //create result array with modified data (may need to move into backend)
  const dataArray: { [key: string]: string | number }[] = [];
  let numLogs = 0;
  if (props.data)
  //iterate through array of objects
  for (let i = 0; i < props.data.length; i++) {
    for (let j = 0; j < props.data[i]['logs'].length; j++) {
      //take function, and then individual logs
      const logInfo: { [key: string]: string | number } = {};
      logInfo['funcName'] = props.data[i]['function'];
      logInfo['id'] = props.data[i]['logs'][j]['id'];
      logInfo['date'] = props.data[i]['logs'][j]['date'];
      logInfo['message'] = props.data[i]['logs'][j]['message'];
      dataArray.push(logInfo);
      numLogs++;
    }
  }
  if (numLogs === 0) {
    const logInfo: { [key: string]: string | number } = {};
    logInfo['funcName'] = 'No error logs recently';
    logInfo['id'] = '';
    logInfo['date'] = '';
    logInfo['message'] = '';
    dataArray.push(logInfo);
  }
  //Ideal result:
  // [...{
  //   funcName: functionName
  //   id: id
  //   date: date here
  //   message: message
  // }]

  //iterate through the data array to create divs
  const errorDivs = [];
  for (let i = 0; i < dataArray.length; i++) {
    errorDivs.push(
      <ErrorTableRow key={`${dataArray[i].date}` + `${dataArray[i].message}` + `${i}`}>
        <ErrorTableCell>{dataArray[i].funcName}</ErrorTableCell>
        <ErrorTableCell>{dataArray[i].id}</ErrorTableCell>
        <ErrorTableCell>{dataArray[i].date}</ErrorTableCell>
        <ErrorTableCell>{dataArray[i].message}</ErrorTableCell>
      </ErrorTableRow>
    );
  }

  return (
    <>
      <h1
        style={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '300',
          color: '#232323',
        }}
      >
        Error Logs
      </h1>
      <ErrorTableDiv>
        <ErrorTableTable>
          <thead>
            <tr>
              <th>Function</th>
              <th>ID</th>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>{errorDivs}</tbody>
        </ErrorTableTable>
      </ErrorTableDiv>
    </>
  );
};

export default ErrorTable;
