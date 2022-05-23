const nodemailer = require("nodemailer");

async function SendMail() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true, // true for 465, false for other ports
    port: 465,// false : 587,
    auth: {
        user: 'j4mes.delez@gmail.com',
        pass: 'fwmmnioqchuakupq'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "j4mes.delez@gmail.com",//'"Fred Foo 👻" <foo@example.com>',
    to: "j4ko.dele@gmail.com",//"bar@example.com, baz@example.com"
    subject: "Hello ✔ World to NodeMiler - Subject", // Subject line
    text: "This is my Text: Hello world?", // plain text body
    html: "<>This is de tag <b/> in HTML Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

SendMail()

/*
node nodemailer.js
*/