const jwt = require('jsonwebtoken')
const {config} = require('./config/config')


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNzM5NjQ5OCIsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjUwMjM5MTUzfQ.A5RQWMP40PSXBIQw3_Vh8EPH9zj0eFiMCYljaK6NtNk'

function verifyToken(payload, secret) {
return jwt.verify(payload,secret );
}
const payload = verifyToken(token, config.jwtSecret )
console.log(payload)
