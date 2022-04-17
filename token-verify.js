const jwt = require('jsonwebtoken')

const secret = 'aaaaycholita';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjbGllbnRlIiwiaWF0IjoxNjUwMjI3NDQ2fQ.veceza0EGn7TVNP49NNHzMvfhTgKnlurgDywwZS30LE'

function verifyToken(payload, secret) {
return jwt.verify(payload,secret );
}
const payload = verifyToken(token, secret )
console.log(payload)
