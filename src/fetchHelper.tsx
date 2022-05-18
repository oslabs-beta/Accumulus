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
  timePeriod: string,
  syncData: boolean = false,
  setUserRegion: Function,
  userRegion: string,
) => {
  const fetchFuncNames = async (setFuncNames: Function) => {
    const response = await fetch('/api/aws/lambdaNames/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: userRegion,
        sync: syncData,
      }),
    });
    const res = await response.json();
    setFuncNames(res);
    console.log(userRegion);
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
          region: userRegion,
          sync: syncData,
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
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setTotalErrors(res.data);
  };

  const fetchTotalCost = async (setTotalCost: Function) => {
    const response = await fetch(`/api/aws/costEachFunction/${timePeriod}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: userRegion,
        sync: syncData,
      }),
    });
    const res = await response.json();
    setTotalCost(res.series[0].data);
  };

  const fetchErrorMessages = async (setErrorMsgs: Function) => {
    const response = await fetch(
      `/api/aws/lambdaErrorLogsEachFunc/${timePeriod}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setErrorMsgs(res);
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
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setMostErroredFuncs(res.ranking);
  };

  const fetchSlowestFuncs = async (setSlowestFuncs: Function) => {
    const response = await fetch(
      `/api/aws/rankFuncsByMetric/Duration/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setSlowestFuncs(res.ranking);
  };

  const fetchMemUsedVsAllo = async (setMemUsedVsAllo: Function) => {
    // const response = await fetch(
    //   `/api/aws/memoryUsageDiff/1hr`, // ** Keep as 1hr - Any longer makes loading times extremely long **
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       region: userRegion,
    //     }),
    //   }
    // );
    // const res = await response.json();
    // setMemUsedVsAllo(res);
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

export const fetchMetricEachFunctions = async (
  setInvocations: Function,
  setDuration: Function,
  setErrors: Function,
  setMemUsage: Function,
  setCost: Function,
  setThrottles: Function,
  timePeriod: string,
  syncData: boolean = false,
  setUserRegion: Function,
  userRegion: string,
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
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setInvocations(res.series[0].data);
    // setInvocations(invocationsMock);
  };

  const fetchDurations = async (setDuration: Function) => {
    const response = await fetch(
      `/api/aws/metricsEachFunc/Duration/${timePeriod}/Average`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: userRegion,
          sync: syncData,
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
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setErrors(res.series[0].data);
    // setErrors(errorsMock);
  };

  const fetchCost = async (setCost: Function) => {
    const response = await fetch(`/api/aws/costEachFunction/${timePeriod}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: userRegion,
        sync: syncData,
      }),
    });
    const res = await response.json();
    setCost(res.series[0].data);
  };

  const fetchThrottles = async (setThrottles: Function) => {
    const response = await fetch(
      `/api/aws/metricsEachFunc/Throttles/${timePeriod}/Sum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: userRegion,
          sync: syncData,
        }),
      }
    );
    const res = await response.json();
    setThrottles(res.series[0].data);
  };

  fetchInvocations(setInvocations);
  fetchDurations(setDuration);
  fetchErrors(setErrors);
  fetchCost(setCost);
  fetchThrottles(setThrottles);
};
