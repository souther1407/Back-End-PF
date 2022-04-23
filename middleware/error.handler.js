const boom = require('@hapi/boom')

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  next()
  
}

function boomErrorHandler (err, req, res, next) {
  
next(err);
}

function error404Handler (req, res, next) {
  
  next()
}


module.exports= {
  logErrors,
  errorHandler,
  boomErrorHandler,
  error404Handler
}
