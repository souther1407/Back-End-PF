const bcrypt = require('bcrypt');

async function verificadora(){
const myPassword = 'rodrigoadmin .123'
const hash = '$2b$12$XfVT/4aT/bGuC.CLM4GGPeKNfqCJHhuzYM1adMi4k30Q0.mIRfB86'
const isMatch = await bcrypt.compare(myPassword, hash);
console.log(isMatch)
}

verificadora()