import React, { useState, useEffect, Component } from 'react';
import { HashRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Functions from './components/Functions';
import Register from './components/Register';
import Menu from './components/splash-menu';
import styled from "styled-components"
// import {
//   Container, 
//   Logo, 
//   Flag, 
//   Text, 
//   Wrapper, 
//   Searchbox,
//   Select,
//   SearchIconWrapper
// } from "./../styles/globals"

interface IuserData {
  arn: string;
  externalId: string;
  region: string;
}

const App = () => {
  const [arn, setArn] = useState('');
  const [userData, setUserData] = useState<IuserData>({
    arn: '',
    externalId: '',
    region: '',
  });
  const [timePeriod, setTimePeriod] = useState('30d');
  const [credentials, setCredentials] = useState(null);
  const [functionList, setFunctionList] = useState([]);
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [chartData, setChartData] = useState();
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalThrottles, setTotalThrottles] = useState(0);
  const [mostActiveFunc, setMostActiveFunc] = useState();
  const [mostErrorFunc, setMostErrorFunc] = useState();
  const [allFuncLogs, setAllFuncLogs] = useState([]);
  const [funcViewData, setFuncViewData] = useState([]);

  console.log('ALL FUNC LOGS', allFuncLogs);

  // SETTING MENU & VIEWS
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  
  const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
  return (
    // <h1>Hello World</h1>
    <HashRouter>
      <div>
        <Wrapper>
          <h1>Welcome to Accumulus!</h1>
        </Wrapper>
        {/* <Register /> */}
        {currentView === 'login' ? (
          <Login setCurrentView={setCurrentView} setUserData={setUserData} />
        ) : (
          <React.Fragment>
            <div>
              <Switch>
                {/* DASHBOARD ROUTE */}
                <Route
                  exact
                  path="/home"
                  render={(props) => (
                    <Dashboard
                      userData={userData}
                      // {...props}
                      // setMenuOpen={setMenuOpen}
                      // totalInvocations={totalInvocations}
                      // chartData={chartData}
                      // totalErrors={totalErrors}
                      // totalThrottles={totalThrottles}
                      // mostActiveFunc={mostActiveFunc}
                      // allFuncLogs={allFuncLogs}
                      // mostErrorFunc={mostErrorFunc}
                      // timePeriod={timePeriod}
                      // setTimePeriod={setTimePeriod}
                    />
                    // <h1>Dashboard</h1>
                  )}
                />
                {/* </Switch>
            </div>
          </React.Fragment> */}

                {/* FUNCTIONS ROUTE */}
                <Route
                  exact
                  path="/functions"
                  render={(props) => (
                    <Functions
                    // setMenuOpen={setMenuOpen}
                    // funcViewData={funcViewData}
                    // allFuncLogs={allFuncLogs}
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

//   <div className={styles.container}>
//     <Head>
//       <title>Accumulus</title>
//       <meta name="description" content="Lambda baby" />
//       {/* <link rel="icon" href="/favicon.ico" /> */}
//     </Head>

//     <nav className={styles.nav}>
//       <Menu />
//     </nav>

//     <main>
//       <h3 className="text-3xl font-bold underline">Landing Page Body Content</h3>
//       <p className="text-3xl font-bold underline">
//         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo dolorem
//         sint placeat, veritatis quo enim architecto fugit deserunt excepturi
//         quaerat nemo et reiciendis earum tenetur! Eum, nobis explicabo.
//         Officia neque commodi libero quibusdam nostrum aliquam fuga quia
//         deserunt tenetur facilis suscipit blanditiis cupiditate, similique hic
//         dignissimos cumque omnis tempore? Illum.
//       </p>
//     </main>

//     <footer className={styles.footer}>
//       <p>Accumulus 2022</p>
//     </footer>
//   </div>
// );

export default App;
