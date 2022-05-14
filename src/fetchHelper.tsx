import { allInvocationsMock } from '../Data/allFuncs/allInvocationsMock';
import { allErrorsMock } from '../Data/allFuncs/allErrorsMock';
import { allCostMock } from '../Data/allFuncs/allCostMock';
import { slowestFuncsMock } from '../Data/byFunc/slowestFuncsMock';
import { errorMessagesMock } from '../Data/byFunc/errorMessagesMock';
import { mostErrorsMock } from '../Data/byFunc/mostErrorsMock';
import { memUsedVsAllo } from '../Data/byFunc/memUsedVsAllo';

import { invocationsMock } from '../Data/byFunc/invocationsMock';
import { durationMock } from '../Data/byFunc/durationMock';
import { errorsMock } from '../Data/byFunc/errorsMock';
import { memUsageMock } from '../Data/byFunc/memUsageMock';
import { costMock } from '../Data/byFunc/costMock';
import { throttlesMock } from '../Data/byFunc/throttlesMock';

export const fetchMetricAllFunctions = async (
  setFuncNames: Function,
  setTotalInvocations: Function,
  setTotalErrors: Function,
  setTotalCost: Function,
  setSlowestFuncs: Function,
  setErrorMsgs: Function,
  setMostErroredFuncs: Function,
  setMemUsedVsAllo: Function,
  timePeriod: string
) => {
  const fetchFuncNames = async (setFuncNames: Function) => {
    const response = await fetch('/api/aws/lambda/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: 'us-east-2',
      }),
    });
    const res = await response.json();
    const names: string[] = [];
    interface IFuncName {
      name: string;
      description: string;
      size: number;
      memoryAllocated: number;
      ephemeral: {
        Size: number;
      };
      timeout: number;
      lastModified: string;
    }
    res.forEach((el: IFuncName) => {
      names.push(el.name);
    });
    setFuncNames(names);
  };

  const fetchTotalInvocations = async (setTotalInvocations: Function) => {
    const response = await fetch(
      `/api/aws/metricsTotalFuncs/Invocations/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setTotalInvocations(res.data);
  };

  const fetchTotalErrors = async (setTotalErrors: Function) => {
    const response = await fetch(
      `/api/aws/metricsTotalFuncs/Errors/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setTotalErrors(res.data);
  };

  const fetchTotalCost = async (setTotalCost: Function) => {
    // const response = await fetch('api/aws/costTotalFunctions/30d', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const res = await response.json();
    // setTotalCost(res.data);
    setTotalCost(allCostMock);
  };

  const fetchErrorMessages = async (setErrorMsgs: Function) => {
    // const response = await fetch('api/aws/lambdaErrorLogsEachFunc/30d', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const res = await response.json();
    // setTotalCost(res.data);
  };

  const fetchMostErrors = async (setMostErroredFuncs: Function) => {
    const response = await fetch(
      `/api/aws/rankFuncsByMetric/Errors/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setMostErroredFuncs(res.ranking);
  };

  const fetchSlowestFuncs = async (setSlowestFuncs: Function) => {
    const response = await fetch(
      `/api/aws/rankFuncsByMetric/Duration/${timePeriod}/Average`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setSlowestFuncs(res.ranking);
  };

  const fetchMemUsedVsAllo = async (setMemUsedVsAllo: Function) => {
    // const response = await fetch(
    //   `/api/aws/memoryUsageDiff/${timePeriod}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       region: 'us-east-2',
    //     }),
    //   }
    // );
    // const res = await response.json();
    // console.log(res)
    setMemUsedVsAllo(memUsedVsAllo);
  };

  fetchFuncNames(setFuncNames);
  fetchTotalInvocations(setTotalInvocations);
  fetchTotalErrors(setTotalErrors);
  fetchTotalCost(setTotalCost);
  fetchErrorMessages(setErrorMsgs);
  fetchMostErrors(setMostErroredFuncs);
  fetchSlowestFuncs(setSlowestFuncs);
  fetchMemUsedVsAllo(setMemUsedVsAllo);
};

export const fetchMetricByFunctions = async (
  setInvocations: Function,
  setDuration: Function,
  setErrors: Function,
  setMemUsage: Function,
  setCost: Function,
  setThrottles: Function,
  timePeriod: string
) => {
  const fetchInvocations = async (setInvocations: Function) => {
    const response = await fetch(
      `/api/aws/metricsEachFunc/Invocations/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setInvocations(res.series[0].data);
    // setInvocations(invocationsMock);
  };

  const fetchDurations = async (setDuration: Function) => {
    const response = await fetch(
      `/api/aws/metricsEachFunc/Duration/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setDuration(res.series[0].data);
    // setDuration(durationMock);
  };

  const fetchErrors = async (setErrors: Function) => {
    const response = await fetch(
      `/api/aws/metricsEachFunc/Errors/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: 'us-east-2',
        }),
      }
    );
    const res = await response.json();
    setErrors(res.series[0].data);
    // setErrors(errorsMock);
  };

  const fetchMemUsage = async (setMemUsage: Function) => {
    // const response = await fetch(
    //   `/api/aws/memoryUsageEachLambda/${timePeriod}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       region: 'us-east-2',
    //     }),
    //   }
    // );
    // const res = await response.json();
    // console.log(res)
    // setMemUsage(res.series[0].data);
    setMemUsage(memUsageMock);
  };

  const fetchCost = async (setCost: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setCost(costMock);
  };

  const fetchThrottles = async (setThrottles: Function) => {
    setThrottles(throttlesMock);
  };

  fetchInvocations(setInvocations);
  fetchDurations(setDuration);
  fetchErrors(setErrors);
  fetchMemUsage(setMemUsage);
  fetchCost(setCost);
  fetchThrottles(setThrottles);
};
