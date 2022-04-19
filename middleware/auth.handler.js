const boom = require('@hapi/boom');
const { config } = require('../config/config')
const jwt = require("jsonwebtoken")

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

function chequearRoles(...roles) {
    return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.roles)){
        next()
    }else {
        next(boom.unauthorized())
    }
    }
}

function checkGoogleToken(req, res, next){
    const { token } = req.body
    try {
        const payload = jwt.verify(token,"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")
        req.googleUser = payload 
        next()
    } catch (error) {
        res.json({err:"no autorizado"})
    }

}

module.exports = {checkApiKey, chequearAdminRole, chequearRoles,checkGoogleToken}