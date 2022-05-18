import React, { useState, useEffect, useMemo, FC } from 'react';
import GlobalStyle from './globals';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Functions from './pages/Functions';
import Memory from './pages/Memory';
import styled from 'styled-components';
import { MainGrid, Nav, Pages } from './styles';
import Navbar from './components/Navbar';
import TimeButtons from './components/TimeButtons';
import * as fetchHelper from './fetchHelper';
import { UserProvider } from '../context/userContext';


const App = () => {

  const [start, setStart] = useState(false);
  const [userRegion, setUserRegion] = useState('us-east-1');
  // console.log(userRegion, 'from App.tsx state hook');
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
  const [errorMsgs, setErrorMsgs] = useState([]);
  // Allocation
  const [memUsedVsAllo, setMemUsedVsAllo] = useState([]);
  // Functions
  const [invocations, setInvocations] = useState([]);
  const [duration, setDuration] = useState([]);
  const [errors, setErrors] = useState([]);

  const [cost, setCost] = useState([]);
  const [throttles, setThrottles] = useState([]);

  //state to manage time metric when fetching data
  const [timePeriod, setTimePeriod] = useState('7d');

  //state to manage resync of data -------REMEMBER TO PASS THE SYNCDATA DOWN --------------
  const [syncData, setSyncData] = useState(false);

  const [currentView, setCurrentView] = useState('splash');

  useEffect(() => {
    if (syncData) {
      // console.log('running fetch Metric ALL Functions');
      fetchHelper.fetchMetricAllFunctions(
        setFuncNames,
        setTotalInvocations,
        setTotalErrors,
        setTotalCost,
        setSlowestFuncs,
        setErrorMsgs,
        setMostErroredFuncs,
        setMemUsedVsAllo,
        timePeriod,
        syncData,
        setUserRegion,
        userRegion
      );
      // console.log('running fetch Metric BY Functions');
      fetchHelper.fetchMetricEachFunctions(
        setInvocations,
        setDuration,
        setErrors,
        setCost,
        setThrottles,
        timePeriod,
        syncData,
        setUserRegion,
        userRegion
      );
      setSyncData(false);
    }
  }, [timePeriod, syncData, userRegion]);

  useEffect(() => {
    if (start) {
      // console.log('running fetch Metric ALL Functions');
      fetchHelper.fetchMetricAllFunctions(
        setFuncNames,
        setTotalInvocations,
        setTotalErrors,
        setTotalCost,
        setSlowestFuncs,
        setErrorMsgs,
        setMostErroredFuncs,
        setMemUsedVsAllo,
        timePeriod,
        syncData,
        setUserRegion,
        userRegion
      );
      // console.log('running fetch Metric BY Functions');
      fetchHelper.fetchMetricEachFunctions(
        setInvocations,
        setDuration,
        setErrors,
        setCost,
        setThrottles,
        timePeriod,
        syncData,
        setUserRegion,
        userRegion
      );
      setSyncData(false);
    }
  }, [start, timePeriod, setUserRegion]);

  return (
    <UserProvider>
    <HashRouter>
      <div>
        <GlobalStyle />
        {currentView === 'splash' ? (
          <Splash
            setCurrentView={setCurrentView}
            setUserRegion={setUserRegion}
            setStart={setStart}
          />
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
                      setUserRegion={setUserRegion}
                      setStart={setStart}
                    />
                  )}
                />

                {/* DASHBOARD ROUTE */}
                <MainGrid>
                  <Nav>
                    <Navbar
                      currentView={currentView}
                      setCurrentView={setCurrentView}
                      setSyncData={setSyncData}
                      setStart={setStart}
                      setUserRegion={setUserRegion}
                    />
                  </Nav>
                  <Pages>
                    <Route
                      exact
                      path="/home"
                      render={(props) => (
                        <Dashboard
                          setUserRegion={setUserRegion}
                          setCurrentView={setCurrentView}
                          setTimePeriod={setTimePeriod}
                          timePeriod={timePeriod}
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
                          setTimePeriod={setTimePeriod}
                          timePeriod={timePeriod}
                          funcNames={funcNames}
                          invocations={invocations}
                          duration={duration}
                          errors={errors}
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
    
                  </Pages>
                </MainGrid>
              </Switch>
            </div>
          </React.Fragment>
        )}
      </div>
    </HashRouter>
    </UserProvider>
  );
};

export default App;
