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
  setTotalInvocations: Function,
  setTotalErrors: Function,
  setTotalCost: Function,
  setSlowestFuncs: Function,
  setErrorMsgs: Function,
  setMostErroredFuncs: Function,
  setMemUsedVsAllo: Function,
  setInvocations: Function,
  setDuration: Function,
  setErrors: Function,
  setMemUsage: Function,
  setCost: Function,
  setThrottles: Function
) => {
  const fetchTotalInvocations = async (setTotalInvocations: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalInvocations(allInvocationsMock);
  };

  const fetchTotalErrors = async (setTotalErrors: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalErrors(allErrorsMock);
  };

  const fetchTotalCost = async (setTotalCost: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalCost(allCostMock);
  };

  const fetchErrorMessages = async (setSlowestFuncs: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setSlowestFuncs(slowestFuncsMock);
  };

  const fetchMostErrors = async (setErrorMsgs: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setErrorMsgs(errorMessagesMock);
  };

  const fetchSlowestFuncs = async (setMostErroredFuncs: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setMostErroredFuncs(mostErrorsMock);
  };

  const fetchMemUsedVsAllo = async (setMemUsedVsAllo: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setMemUsedVsAllo(memUsedVsAllo);
  };

  const fetchInvocations = async (setInvocations: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setInvocations(invocationsMock);
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

  fetchTotalInvocations(setTotalInvocations);
  fetchTotalErrors(setTotalErrors);
  fetchTotalCost(setTotalCost);
  fetchErrorMessages(setSlowestFuncs);
  fetchMostErrors(setErrorMsgs);
  fetchSlowestFuncs(setMostErroredFuncs);
  fetchMemUsedVsAllo(setMemUsedVsAllo);
  fetchInvocations(setInvocations);
  fetchDurations(setDuration);
  fetchErrors(setErrors);
  fetchMemUsage(setMemUsage);
  fetchCost(setCost);
  fetchThrottles(setThrottles);
};
