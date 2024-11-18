const nodemailer = require("nodemailer");
const { smtpPassword } = require("../secret");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "abulkasem32833@gmail.com",
      pass: smtpPassword
    },
})

const verifyEmail = async(mailData)=>{
    try {
        transporter.sendMail(mailData)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {verifyEmail}