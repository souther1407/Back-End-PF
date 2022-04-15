const bcrypt = require('bcrypt');

async function hasheadora(){
const myPassword = ' admin 123 .202'
const hash = await bcrypt.hash(myPassword, 12);
console.log(hash)
}

hasheadora()