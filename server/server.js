const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
  });

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Unknown path'));

app.use((err, req, res, next) => {
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