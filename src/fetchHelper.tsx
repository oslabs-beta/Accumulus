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
  setMemUsedVsAllo: Function
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
    console.log('func names res', res);
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
      '/api/aws/metricsAllFuncs/Invocations/30d/Sum',
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
    const response = await fetch('/api/aws/metricsAllFuncs/Errors/30d/Sum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: 'us-east-2',
      }),
    });
    const res = await response.json();
    setTotalErrors(res.data);
  };

  const fetchTotalCost = async (setTotalCost: Function) => {
    // const response = await fetch('api/aws/costAllFunctions/30d', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const res = await response.json();
    // setTotalCost(res.data);
    setTotalCost(allCostMock);
  };

  const fetchErrorMessages = async (setErrorMsgs: Function) => {};

  const fetchMostErrors = async (setMostErroredFuncs: Function) => {
    const response = await fetch('/api/aws/rankFuncsByMetric/Errors/30d/Sum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: 'us-east-2',
      }),
    });
    const res = await response.json();
    setMostErroredFuncs(res.ranking);
  };

  const fetchSlowestFuncs = async (setSlowestFuncs: Function) => {
    const response = await fetch(
      '/api/aws/rankFuncsByMetric/Duration/30d/Average',
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
    // IN THE FUTURE, FETCH FROM API
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
  setThrottles: Function
) => {
  const fetchInvocations = async (setInvocations: Function) => {
    const response = await fetch('/api/aws/metricsByFunc/Invocations/30d/Sum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: 'us-east-2',
      }),
    });
    console.log('fetchInvocations response', response);
    const res = await response.json();
    console.log('fetchInvocations', res.data);
    setInvocations(res.data);
    // setInvocations(invocationsMock);
  };

  const fetchDurations = async (setDuration: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setDuration(durationMock);
  };

  const fetchErrors = async (setErrors: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setErrors(errorsMock);
  };

  const fetchMemUsage = async (setMemUsage: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setMemUsage(memUsageMock);
  };

  const fetchCost = async (setCost: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setCost(costMock);
  };

  const fetchThrottles = async (setThrottles: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setThrottles(throttlesMock);
  };

  fetchInvocations(setInvocations);
  fetchDurations(setDuration);
  fetchErrors(setErrors);
  fetchMemUsage(setMemUsage);
  fetchCost(setCost);
  fetchThrottles(setThrottles);
};
