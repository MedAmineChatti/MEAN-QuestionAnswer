var nodemailer = require('nodemailer');

module.exports = async (email, subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', 
            post:587,
            secure:true,
            auth: {
                   user: 'amiine.chatti@gmail.com',
                   pass: 'bavari202'
               }
           });
           await transporter.sendMail( {
            from: email, // sender address
            to: 'amiine.chatti@gmail.com', // list of receivers
            subject: subject,
            text:text, // Subject line            
          });
          console.log('email send successfully')
    } catch (error) {
        console.log('email not send ')

    }
}