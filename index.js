const nodemailer = require('nodemailer');
const fs = require('fs');
const config = require('./config');

const templateToSend = 'example.html';

nodemailer.createTestAccount((err, acc) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.user,
            pass: config.pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Luiz" <lgm.ferrari@gmail.com>', // sender address
        to: '<azteixeira@vmtestdrive.com>', // list of receivers
        subject: '[TESTE] Send Email', // Subject line
        text: '', // plain text body
        html: fs.readFileSync(`./templates/${templateToSend}`).toString('utf-8') // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
