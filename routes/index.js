const habitacionesRouter = require('./habitaciones.route')
const camasRouter = require('./camas.router')
const usuariosRouter = require('./usuarios.router')
const reservaRouter =  require('./reservas.router')
const habitaciontipoRouter = require('./habitaciontipo.router')
const pagoRouter = require('./pagos.router')

// const habitacionesDisponiblesRouter = require('./habitacionesDisponibles.router')

const nacionalidadesRouter = require("./nacionalidades.router")


const authRouter = require('./auth.router')


function routerApi (app) {
  app.use('/habitaciones', habitacionesRouter );
  app.use('/habitacionestipo', habitaciontipoRouter)
  // app.use('/hab', habitacionesDisponiblesRouter)
  app.use('/camas', camasRouter );
  app.use('/usuarios', usuariosRouter );
  app.use('/reservas', reservaRouter );
  //app.use('/imagenes', imgenRouter );
  app.use("/nacionalidades", nacionalidadesRouter);
  app.use('/auth', authRouter);
  // app.use('/huespedes', huespedRouter)
  app.use('/pagos', pagoRouter)
}

module.exports = routerApi;