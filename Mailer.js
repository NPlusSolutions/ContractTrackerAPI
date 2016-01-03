var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ravituwar@gmail.com',
        pass: 'tuvarvilla'
    }
});
module.exports = {
		sendMail: function(mailOptions) {
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        return console.log(error);
				    }
			    	console.log('Message sent: ' + info.response);
				});
		}

}
