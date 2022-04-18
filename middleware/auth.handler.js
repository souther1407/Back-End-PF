const boom = require('@hapi/boom');
const { config } = require('../config/config')

function checkApiKey(req, res, next){
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    }else {
        next(boom.unauthorized())
    }
}

function chequearAdminRole(req, res, next) {
   const user = req.user;
   if(user.role === 'administrador'){
       next()
   } else {
       next(boom.unauthorized('necesitas permiso de administrador'))
   }
}

module.exports = {checkApiKey, chequearAdminRole}