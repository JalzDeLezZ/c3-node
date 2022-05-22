const bcrypt = require('bcrypt');

async function hashPassword(){
  const password = '123456';
  // const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
}

hashPassword();