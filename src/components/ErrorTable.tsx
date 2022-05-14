import React from 'react';
import styled from 'styled-components';
import { errorMessagesMock } from '.././../Data/byFunc/errorMessagesMock';
import { ErrorTableTable, ErrorTableRow, ErrorTableCell } from '../styles';

interface ErrorTableProps {
  data: any[];
}

//WHEN FETECHING, REMEMBER TO ADD props:ErrorProps
const ErrorTable = (props: ErrorTableProps) => {
  //create result array with modified data (may need to move into backend)
  const dataArray: { [key: string]: string | number }[] = [];
  props.data;
  //iterate through array of objects
  for (let i = 0; i < props.data.length; i++) {
    for (let j = 0; j < props.data[i]['logs'].length; j++) {
      //take function, and then individual logs
      const logInfo: { [key: string]: string | number } = {};
      logInfo['funcName'] = props.data[i]['function'];
      //should ids be unique? think about how this would look? is it unique per function? should we due object literals?
      logInfo['id'] = props.data[i]['logs'][j]['id'];
      logInfo['date'] = props.data[i]['logs'][j]['date'];
      logInfo['message'] = props.data[i]['logs'][j]['message'];
      dataArray.push(logInfo);
    }
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
      <ErrorTableRow key={`${dataArray[i].date}` + `${dataArray[i].message}`}>
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
      <div
        style={{
          overflow: 'scroll',
          height: '75%',
        }}
      >
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
      </div>
    </>
  );
};

export default ErrorTable;
