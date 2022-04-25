// const express = require('express');
// const path = require('path');
// const app: express.Application = express();
// const PORT = 3000;

import express from 'express';
import path from 'path';
const app: express.Application = express();
const PORT = 3000;

require('dotenv').config();

app.use(express.json());

app.get('/', (req:express.Request, res:express.Response):void => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
  });

// catch-all route handler for Express requests to an unknown route
app.use((req:express.Request, res:express.Response):void => {
  res.status(404).send('Unknown path')
});

app.use((err:object, req:express.Request, res:express.Response, next:express.NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = { ...defaultErr, ...err };
    console.log('errorObj', errorObj);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})

export default app;