import { invocationsMock } from '../Data/invocationsMock';

export const fetchMetricAllFunctions = async (
  setTotalInvocations: Function,
  setTotalErrors: Function,
  setTotalCost: Function,
  setSlowestFuncs: Function,
  setErrors: Function,
  setMostErroredFuncs: Function
) => {
  const fetchTotalInvocations = async (setTotalInvocations: Function) => {
    // // FUTURE FETCH
    // const response = await fetch(
    //   'https://accumulus.s3.us-east-2.amazonaws.com/data/lambda/invocations/invocations-total-month.json',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     // mode: 'no-cors',
    //   }
    // );
    // const res = await response.json();
    console.log(invocationsMock);
    setTotalInvocations(invocationsMock);
  };

  fetchTotalInvocations(setTotalInvocations);
};
