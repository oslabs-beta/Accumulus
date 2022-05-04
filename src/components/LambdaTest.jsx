import React, { useState, useEffect } from 'react';

function LambdaTest() {
  const [ lambdaFuncs, setLambdaFuncs ] = useState();
  
  // GET cohort members
  useEffect(() => {
    let isRequestSubscribed = true;
    console.log('hey')
    fetch(`http://localhost:3000/api/aws/`, {
      mode: 'no-cors',
    })
    .then((resData) => {
      console.log('yo')
      return resData.json()
    })
    .then((data) => {
      console.log('here')
      console.log(data)
      if (isRequestSubscribed) {
      }
    })
    .catch((err) => setLambdaFuncs([err]));

    return () => {
      isRequestSubscribed = false;
    };
  }, []);

  return (
    <div>
      <h1>
        Lambda Functions
      </h1>
      <p>

      </p>
    </div>
  );
};

export default LambdaTest;
