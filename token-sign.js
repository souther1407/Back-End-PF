const jwt = require('jsonwebtoken')

const secret = 'aaaaycholita';
const payload = {
    sub: 1,
    role: 'cliente'
}

function singToken(payload, secret) {
return jwt.sign(payload,secret );
}
const token = singToken(payload, secret )
console.log(token)