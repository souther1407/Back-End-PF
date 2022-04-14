function logErrors (err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
<<<<<<< HEAD
  next();
=======
  next(err);
>>>>>>> ea24bcb2608d3d323a8bf9a69c16734fc7f49b52
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
next(err);
}



module.exports= {
  logErrors,
  errorHandler,
  boomErrorHandler
}
