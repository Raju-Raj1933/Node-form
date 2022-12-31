const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cleanUpAndValidate = ({ name, password, email, Phone, username }) => {
  return new Promise((resolve, reject) => {
    if (typeof email != "string") reject("Invalid Email");
    if (typeof name != "string") reject("Invalid name");
    if (typeof password != "string") reject("Invalid Password");
    if (typeof username != "string") reject("Invalid username");

    if (!email || !password || !username) reject("Invalid Data");

    if (!validator.isEmail(email)) reject("Invalid Email Format");

    if (username.length < 3) reject("Username too short");

    if (username.length > 50) reject("Username too long");

    if (password.length < 5) reject("Password too short");

    if (password.length > 200) reject("Password too long");

    resolve();
  });
};

const jwtSign = (email) => {
  const JWT_TOKEN = jwt.sign({ email: email }, "backendnodejs", {
    expiresIn: "15d",
  });
  return JWT_TOKEN;
};

const sendVerifcationEmail = (email, verificationToken) => {
  console.log(email, verificationToken);

  let mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
      user: "rajraju1610@gmail.com",
      pass: "dontmissusepass",
    },
  });

  let sender = "profile";
  let mailOptions = {
    from: sender,
    to: email,
    subject: "Email Verification for profile",
    html: `Press <a href=http://localhost:8000/verifyEmail/${verificationToken}> Here </a> to verify your account.`,
  };

  mailer.sendMail(mailOptions, function (err, response) {
    if (err) throw err;
    else console.log("Mail has been sent successfully");
  });
};

module.exports = { cleanUpAndValidate, jwtSign, sendVerifcationEmail };
