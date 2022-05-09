export const errorMessagesMock = [
  {
    function: 'AccumulusFunc3',
    year: 2022,
    month: 'January',
    logs: [
      {
        id: 1,
        date: '2022-01-21T19:35:30.000Z',
        message:
          "[ERROR] NameError: name 'prin' is not defined Traceback (most recent call last): File '/var/task/lambda_function.py', line 10, in lambda_handler prin('value3 = ' + event['key3']) [ERROR] NameError: name 'prin' is not defined Traceback (most recent call last):",
      },
      {
        id: 2,
        date: '2022-01-02T19:35:30.000Z',
        message: 'Delegation not found',
      },
    ],
  },
  {
    function: 'AccumulusFunc1',
    year: 2022,
    month: 'January',
    logs: [
      {
        id: 1,
        date: '2022-01-11T19:35:30.000Z',
        message: 'ARN does not exist for user',
      },
      {
        id: 2,
        date: '2022-01-09T19:35:30.000Z',
        message: 'InvalidParamterCombination',
      },
    ],
  },
  {
    function: 'AccumulusFunc4',
    year: 2022,
    month: 'January',
    logs: [],
  },
  {
    function: 'AccumulusFunc2',
    year: 2022,
    month: 'January',
    logs: [],
  },
  {
    function: 'AccumulusFunc5',
    year: 2022,
    month: 'January',
    logs: [
      {
        id: 1,
        date: '2022-01-21T19:35:30.000Z',
        message: 'Did not find a handler for event',
      },
      {
        id: 2,
        date: '2022-01-12T19:35:30.000Z',
        message: 'Unauthorized request by user. Execution halted.',
      },
      {
        id: 3,
        date: '2022-01-26T19:35:30.000Z',
        message: 'Unauthorized request by user. Execution halted.',
      },
    ],
  },
];
