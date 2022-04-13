const habitacionesRouter = require('./habitaciones.route')
const camasRouter = require('./camas.router')
const usuariosRouter = require('./usuarios.router')
const reservaRouter =  require('./reservas.router')
const habitaciontipoRouter = require('./habitaciontipo.router')

function routerApi (app) {
  app.use('/habitaciones', habitacionesRouter );
  app.use('/habitacionestipo', habitaciontipoRouter)
  app.use('/camas', camasRouter );
  app.use('/usuarios', usuariosRouter );
  app.use('/reservas', reservaRouter );

}

module.exports = routerApi;
