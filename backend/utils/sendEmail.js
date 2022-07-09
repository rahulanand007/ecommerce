const nodeMailer = require("nodemailer")


const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port: "465",
        service: "gmail",
        auth:{
            user: "tempecommerceweb@gmail.com",
            pass: "tempecom2712"
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;