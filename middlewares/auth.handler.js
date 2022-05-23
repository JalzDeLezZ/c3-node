const boom = require('@hapi/boom');

const {config} = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.myApiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next){
  console.log(req.user);
  const {user} = req;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkByRoles(roles) {
  return (req, res, next) => {
    const {user} = req;
    console.log(req.user);
    console.log(roles);
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = {checkApiKey, checkAdminRole, checkByRoles};