const boom = require('@hapi/boom')

function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  if(err){
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    })
  }else{
    next(err)
  }
  
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
next(err);
}

function error404Handler (req, res, next) {
  res.status(404)
  res.send ({
  message: boom.notFound('el recurso que busca no existe')
  })
  next()
}


module.exports= {
  logErrors,
  errorHandler,
  boomErrorHandler,
  error404Handler
}
