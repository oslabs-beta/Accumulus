import { invocationsMock } from '../Data/invocationsMock';
import { errorsMock } from '../Data/errorsMock';
import { costMock } from '../Data/costMock';
import { slowestFuncsMock } from '../Data/slowestFuncsMock';
import { errorMessagesMock } from '../Data/errorMessagesMock';
import { mostErrorsMock } from '../Data/mostErrorsMock';

export const fetchMetricAllFunctions = async (
  setTotalInvocations: Function,
  setTotalErrors: Function,
  setTotalCost: Function,
  setSlowestFuncs: Function,
  setErrorMsgs: Function,
  setMostErroredFuncs: Function
) => {
  const fetchTotalInvocations = async (setTotalInvocations: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalInvocations(invocationsMock);
  };

  const fetchTotalErrors = async (setTotalErrors: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalErrors(errorsMock);
  };

  const fetchTotalCost = async (setTotalCost: Function) => {
    // IN THE FUTURE, FETCH FROM API
    setTotalCost(costMock);
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

  fetchTotalInvocations(setTotalInvocations);
  fetchTotalErrors(setTotalErrors);
  fetchTotalCost(setTotalCost);
  fetchErrorMessages(setSlowestFuncs);
  fetchMostErrors(setErrorMsgs);
  fetchSlowestFuncs(setMostErroredFuncs);
};
