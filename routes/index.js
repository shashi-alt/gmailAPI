var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

/* GET home page. */
router.get('/', function(req, res, next) {   //i am using ejs engine for Nodejs  so this part is seeing here
  res.render('index', { title: ' Sending Email using Gmail Google API' });
});


// All id's and secrets should come from generated  file.
 const CLIENT_ID = '';      //put your clint Id here
const CLEINT_SECRET = '';    //put Your SECRET KEY here
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '';    //put your refresh Token Here

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });   //use Refresh Tokens from Oauth

async function sendMail() {       // create a function to send the email using Nodemailer
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'srk694307@gmail.com', //put your email here
                clientId: CLIENT_ID,  //put your client id here
                clientSecret: CLEINT_SECRET, //put your secret here
                refreshToken: REFRESH_TOKEN, //put your refresh token here
                accessToken: accessToken,    // put your accessToken here
            },
        });

        const mailOptions = {
            from: 'shashi ranjan kumar <srk694307@gmail.com>',   // your {console.cloud.google registred} Email id here
            to: '',      // put  EmailID of receiver and if you want to send a same email message to more account then use COMMA (,) between two Email Id.
            subject: 'my address',  //write your subject here
            text: 'I am shashi ranjan kumar your brother',  // your text message here
            html: '<h1>I am shashi ranjan kumar your brother</h1>',    // It is optional because some clients not want to Html version
        };


        const result = await transport.sendMail(mailOptions);   // its promises so simply use here await
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));

module.exports = router;
