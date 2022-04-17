const bcrypt = require('bcrypt');

async function hasheadora(){
const myPassword = 'rodrigoadmin .123'
const hash = await bcrypt.hash(myPassword, 12);
console.log(hash)
}

hasheadora()