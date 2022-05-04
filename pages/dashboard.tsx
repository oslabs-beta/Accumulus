import React, { useState } from 'react';
import DashboardMenu from '../components/dashboardMenu';
import Counter from '../features/counter/Counter'

const Dashboard: React.FunctionComponent = () => {
  return (
    <>
      <DashboardMenu />
      <Counter />
    </>
  );
};

export default Dashboard;
