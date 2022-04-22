const habitacionesRouter = require('./habitaciones.route')
const camasRouter = require('./camas.router')
const usuariosRouter = require('./usuarios.router')
const reservaRouter =  require('./reservas.router')
const habitaciontipoRouter = require('./habitaciontipo.router')
// const habitacionesDisponiblesRouter = require('./habitacionesDisponibles.router')

const authRouter = require('./auth.router')


function routerApi (app) {
  app.use('/habitaciones', habitacionesRouter );
  app.use('/habitacionestipo', habitaciontipoRouter)
  // app.use('/hab', habitacionesDisponiblesRouter)
  app.use('/camas', camasRouter );
  app.use('/usuarios', usuariosRouter );
  app.use('/reservas', reservaRouter );
  //app.use('/imagenes', imgenRouter );
  app.use('/auth', authRouter);

}

module.exports = routerApi;