const bcrypt = require('bcrypt');

async function verifyPassword(){
  const password = '123456';
  const hash = '$2b$10$1ePOrB5ziMS17ctBw4UEqewjnpS2dg8SLhlsuJI.HSZ32TpCvNO0.';
  const isMatch = await bcrypt.compare(password, hash);
  console.log(isMatch);
}

verifyPassword();