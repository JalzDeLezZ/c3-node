const jwt = require('jsonwebtoken')

const secret = 'myCat'

const payload = {
  sub: 1,
  role: 'customer'
}

function singToken(payload, secret){
  return jwt.sign(payload, secret)
}

const token = singToken(payload, secret)
console.log(token)

/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1MzI1NzYxMX0.ddFBn_SeeWJJGxO303d8lRl58P4x6WADvOeTXzfVj9Q

*/