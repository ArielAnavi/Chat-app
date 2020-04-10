const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    let transporter;
    if (process.env.NODE_ENV === "development") {
         transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSSWORD
            }
        });
    } else {
         transporter = nodemailer.createTransport({
            service: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSSWORD
            }
        });
    }

    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });
};

module.exports = sendEmail;