import React, { useState } from 'react';
import {AppWrapper} from '../context/stateContext';

import DashboardMenu from '../components/dashboardMenu';


const Dashboard: React.FunctionComponent = () => {

  return(
    <>
    <AppWrapper>
      <DashboardMenu />
    </AppWrapper>
    </>
  )
};

export default Dashboard;