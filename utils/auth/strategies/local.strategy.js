const {Strategy} = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../../services/user.service')
const service = new UserService()

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false)
      }
      const bIsMatch = await bcrypt.compare(password, user.password);
      if (!bIsMatch) {
        done(boom.unauthorized(), false)
      }
      delete user.dataValues.password
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
);

module.exports = LocalStrategy;


/*
Post
{
	"username": "vcx.delez@mail.com",
	"password": "12345"
}
rename send to login

{
	"email": "vcx.delez@mail.com",
	"password": "12345"
}
*/