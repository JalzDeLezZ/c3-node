const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./user.service');
const service = new UserService();
const jwt = require('jsonwebtoken')
const {config} = require('../config/config');
const nodemailer = require("nodemailer");

class AuthService {

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw boom.unauthorized('Invalid email or password');
    }
    delete user.dataValues.password;
    return user;
  }

  singToken(user){

      const payload = {
        sub: user.id,
        role: user.role
      }

      const token = jwt.sign(payload, config.jwtSecret);

      return({
          user,
          token
      });
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail){

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
          user: config.smtpEmail,
          pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);

    return {message: 'Email sent'};
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized('Invalid token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return {message: 'Password changed'};
    } catch (error) {
      throw boom.unauthorized('Invalid token');
    }
  }
}

module.exports = AuthService;