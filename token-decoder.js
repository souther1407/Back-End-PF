const jwt = require('jsonwebtoken')
const {config} = require('./config/config')


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzODc5ODU0OCIsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjUwNDIwNzA2fQ.mAQ5KHsaXER0rV_eQetdIaEH_92nN4iSKhW1-L_abD0'

function decodingToken(token) {
return jwt.decode(token );
}
const payload = decodingToken(token)
console.log(payload)
