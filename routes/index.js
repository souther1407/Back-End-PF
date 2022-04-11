const habitacionesRouter = require('./habitaciones.route')
const camasRouter = require('./camas.router')
const usuariosRouter = require('./usuarios.router')
const reservaRouter =  require('./reservas.router')


function routerApi (app) {
  app.use('/habitaciones', habitacionesRouter );
  app.use('/camas', camasRouter );
  app.use('/usuarios', usuariosRouter );
  app.use('/reservas', reservaRouter );

}

module.exports = routerApi;
