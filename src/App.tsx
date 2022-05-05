import React, { useState, useEffect, Component } from 'react';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Functions from './components/Functions';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Menu from './components/splash-menu';
import styled from 'styled-components';
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

  const [totalInvocations, setTotalInvocations] = useState([]);
  const [totalErrors, setTotalErrors] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [slowestFuncs, setSlowestFuncs] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [mostErroredFuncs, setMostErroredFuncs] = useState([]);

  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    console.log('running fetchMetricAllFunctions');
    fetchHelper.fetchMetricAllFunctions(
      setTotalInvocations,
      setTotalErrors,
      setTotalCost,
      setSlowestFuncs,
      setErrorMsgs,
      setMostErroredFuncs
    );
  }, [userData]);

  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  return (
    <HashRouter>
      <div>
        <Wrapper>
          <h1>Welcome to Accumulus!</h1>
        </Wrapper>
        {currentView === 'login' ? (
          <Login setCurrentView={setCurrentView} setUserData={setUserData} />
        ) : (
          <React.Fragment>
            <div>
              <Sidebar />
              <Switch>
                {/* DASHBOARD ROUTE */}
                <Route
                  exact
                  path="/home"
                  render={(props) => (
                    <Dashboard
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
                  render={(props) => <Functions {...userData} />}
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
