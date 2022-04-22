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
if(user.rol === 'administrador'){
    next()
} else {
    next(boom.unauthorized('necesitas permiso de administrador'))
}
}

function chequearRoles(...roles) {
    return (req, res, next) => {
    const user = req.user;
    console.log(user.role)
    console.log(roles[0])
    if (roles.includes(user.role)){
        next()
    }else {
        next(boom.unauthorized(`aaaaay cholita!, aca no!`))
    }
    }
}

module.exports = {checkApiKey, chequearAdminRole, chequearRoles}