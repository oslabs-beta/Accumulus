import React from 'react';
import styled from 'styled-components'
import { errorMessagesMock } from '.././../Data/byFunc/errorMessagesMock';

interface ErrorProps{
  function: string,
  year?: number,
  month?: string,
  logs: {[key: string]: string | number}[]
}

interface LogInfo{
  funcName: string,
  id: string | number,
  date: string,
  message: string
}

//MOVE TO STYLES PAGE ONCE DONE
const Table = styled.table`
  width: 100%;
  background: white;
  border: 1px solid black;
  box-sizing: border-box;
  border-collapse: collapse;
  color: black;
`
// how do I get it to scroll for overflow?
// overflow: scroll;

const TableHead = styled.th`
`

const Row = styled.tr`
  &:nth-Child(2n){
    background: red;
  }
`
const Cell = styled.td`
  padding: 10px, 10px;
  overflow: hidden;
`

//WHEN FETECHING, REMEMBER TO ADD props:ErrorProps
const ErrorTable = () => {
  //create result array with modified data (may need to move into backend)
  const dataArray:{[key:string]: string | number}[] = []
  //iterate through array of objects
  for (let i = 0; i < errorMessagesMock.length; i++) {
    for (let j = 0; j < errorMessagesMock[i]['logs'].length; j++) {
    //take function, and then individual logs
    const logInfo:{[key:string]: string | number} = {};
    logInfo['funcName'] = errorMessagesMock[i]['function']
    //should ids be unique? think about how this would look? is it unique per function? should we due object literals?
    logInfo['id'] = errorMessagesMock[i]['logs'][j]['id']
    logInfo['date'] = errorMessagesMock[i]['logs'][j]['date']
    logInfo['message'] = errorMessagesMock[i]['logs'][j]['message']
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
  const errorDivs = []
  for (let i = 0; i < dataArray.length; i++) {
    errorDivs.push(
      <Row>
        <Cell>{dataArray[i].funcName}</Cell>
        <Cell>{dataArray[i].id}</Cell>
        <Cell>{dataArray[i].date}</Cell>
        <Cell>{dataArray[i].message}</Cell>
      </Row>
    )
  }

  return(
    <>
    <Table>
      <thead>
        <TableHead>Function</TableHead>
        <TableHead>ID</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Message</TableHead>
      </thead>
      <tbody>
        {errorDivs}
      </tbody>
    </Table>
    </>
  );
}

export default ErrorTable;