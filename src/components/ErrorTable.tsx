import React from 'react';
import styled from 'styled-components';
import { errorMessagesMock } from '.././../Data/byFunc/errorMessagesMock';
import { ErrorTableTable, ErrorTableRow, ErrorTableCell } from '../styles';

interface ErrorProps {
  function: string;
  year?: number;
  month?: string;
  logs: { [key: string]: string | number }[];
}

interface LogInfo {
  funcName: string;
  id: string | number;
  date: string;
  message: string;
}

//WHEN FETECHING, REMEMBER TO ADD props:ErrorProps
const ErrorTable = () => {
  //create result array with modified data (may need to move into backend)
  const dataArray: { [key: string]: string | number }[] = [];
  //iterate through array of objects
  for (let i = 0; i < errorMessagesMock.length; i++) {
    for (let j = 0; j < errorMessagesMock[i]['logs'].length; j++) {
      //take function, and then individual logs
      const logInfo: { [key: string]: string | number } = {};
      logInfo['funcName'] = errorMessagesMock[i]['function'];
      //should ids be unique? think about how this would look? is it unique per function? should we due object literals?
      logInfo['id'] = errorMessagesMock[i]['logs'][j]['id'];
      logInfo['date'] = errorMessagesMock[i]['logs'][j]['date'];
      logInfo['message'] = errorMessagesMock[i]['logs'][j]['message'];
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
    </>
  );
};

export default ErrorTable;
