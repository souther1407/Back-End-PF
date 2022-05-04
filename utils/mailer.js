
const nodemailer = require('nodemailer');
const {config} = require('../config/config.js')


const enviarEmail = async function (mail) {
    
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
    user: config.email,
    pass: config.emailPassword, 
            }
        });
    await transporter.sendMail(mail);
    return {message: 'se envio el correo'}        
}

module.exports = {enviarEmail} 