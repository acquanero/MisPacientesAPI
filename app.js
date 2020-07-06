const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./api/index');

const app = express();

// enables cors for all requests. see https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
