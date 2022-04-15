const bcrypt = require('bcrypt');

async function verificadora(){
const myPassword = ' admin 123 .202'
const hash = '$2b$12$7iimWoHMpsWeovCOl1n04u7CsskZl7q7vl98RVugDXiTaSudi39wC'
const isMatch = await bcrypt.compare(myPassword, hash);
console.log(isMatch)
}

verificadora()