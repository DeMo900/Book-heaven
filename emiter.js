const nodemailer = require("nodemailer");
const EventEmitter = require("events");  

const emitter = new EventEmitter();

// register your listener
emitter.on("loggedIn", (email, username) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "proplayer524522@gmail.com",
      pass: process.env.APPCODE
    }
  });

  transport.sendMail({
    to: email,
    subject: "Welcome message",
    text: `Welcome ${username}, happy to see you!`
  });
});

// export the instance
module.exports = emitter;
