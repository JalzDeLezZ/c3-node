const jwt = require('jsonwebtoken')

const secret = 'myCat'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1MzI1NzYxMX0.ddFBn_SeeWJJGxO303d8lRl58P4x6WADvOeTXzfVj9Q'

function verifyToken(token, secret){
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret)
console.log(payload)