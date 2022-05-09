import React, { useState, useEffect, Component } from 'react';
import GlobalStyle from './globals';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Functions from './pages/Functions';
import Memory from './pages/Memory';
import Register from './pages/Register';
import Menu from './components/splash-menu';
import styled from 'styled-components';
import { DashSideBar } from './styles';
import * as fetchHelper from './fetchHelper';

interface IuserData {
  arn: string;
  externalId: string;
  region: string;
}

const App = () => {
  const [userData, setUserData] = useState<IuserData>({
    arn: '',
    externalId: '',
    region: '',
  });

  const [funcNames, setFuncNames] = useState([]);

  // --------- ALL FUNCS HOOKS
  // Dashboard
  const [totalInvocations, setTotalInvocations] = useState([]);
  const [totalErrors, setTotalErrors] = useState([]);
  const [totalCost, setTotalCost] = useState([]);

  // --------- BY FUNC HOOKS
  // Dashboard
  const [slowestFuncs, setSlowestFuncs] = useState([]);
  const [mostErroredFuncs, setMostErroredFuncs] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]); // unused currently
  // Allocation
  const [memUsedVsAllo, setMemUsedVsAllo] = useState([]);
  // Functions
  const [invocations, setInvocations] = useState([]);
  const [duration, setDuration] = useState([]);
  const [errors, setErrors] = useState([]);
  const [memUsage, setMemUsage] = useState([]);
  const [cost, setCost] = useState([]);
  const [throttles, setThrottles] = useState([]);

  const [currentView, setCurrentView] = useState('splash');

  useEffect(() => {
    if (currentView === 'dashboard') {
      console.log('running fetch Metric ALL Functions');
      fetchHelper.fetchMetricAllFunctions(
        setFuncNames,
        setTotalInvocations,
        setTotalErrors,
        setTotalCost,
        setSlowestFuncs,
        setErrorMsgs,
        setMostErroredFuncs,
        setMemUsedVsAllo
      );
    } else if (currentView === 'functions') {
      console.log('running fetch Metric BY Functions');
      fetchHelper.fetchMetricByFunctions(
        setInvocations,
        setDuration,
        setErrors,
        setMemUsage,
        setCost,
        setThrottles
      );
    }
  }, [currentView]);

  // useEffect(() => {
  //   console.log(funcNames);
  // }, [funcNames]);

  const Wrapper = styled.section`
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  `;
  return (
    <HashRouter>
      <div>
        <GlobalStyle />
        {currentView === 'splash' ? (
          <Splash setCurrentView={setCurrentView} setUserData={setUserData} />
        ) : (
          <React.Fragment>
            <div>
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <Login
                      setCurrentView={setCurrentView}
                      setUserData={setUserData}
                    />
                  )}
                />
                {/* <Route 
                  exact
                  path="/register"
                  render={(props) => (
                    <Register
                    setCurrentView={setCurrentView}
                    setUserData={setUserData}/>
                  )}
                /> */}

                {/* DASHBOARD ROUTE */}
                <Route
                  exact
                  path="/home"
                  render={(props) => (
                    <Dashboard
                      setCurrentView={setCurrentView}
                      totalInvocations={totalInvocations}
                      totalErrors={totalErrors}
                      totalCost={totalCost}
                      slowestFuncs={slowestFuncs}
                      errorMsgs={errorMsgs}
                      mostErroredFuncs={mostErroredFuncs}
                    />
                  )}
                />

                {/* FUNCTIONS ROUTE */}
                <Route
                  exact
                  path="/functions"
                  render={(props) => (
                    <Functions
                      setCurrentView={setCurrentView}
                      funcNames={funcNames}
                      invocations={invocations}
                      duration={duration}
                      errors={errors}
                      memUsage={memUsage}
                      cost={cost}
                      throttles={throttles}
                    />
                  )}
                />

                {/* ALLOCATIONS ROUTE */}
                <Route
                  exact
                  path="/memory"
                  render={(props) => (
                    <Memory
                      setCurrentView={setCurrentView}
                      memUsedVsAllo={memUsedVsAllo}
                    />
                  )}
                />
              </Switch>
            </div>
          </React.Fragment>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
