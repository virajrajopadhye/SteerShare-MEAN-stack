/**
 * Use 'express' framework for developing endpoints
 * Use MongoDB for the database
 * Use body-parser to interpret the requests
*/
const config = require('./app/config.json');
const cors = require("cors");




let express = require('express'),
              app = express(),
              port = process.env.PORT || 3000, 
              mongoose = require('mongoose'),
              bodyParser = require('body-parser'),
              http = require('http'),
              server = http.createServer(app);
              socketIO = require('socket.io');
              io = socketIO(server);

              


//Chatting Socket
// users = [];
// io.on('connection', (socket)=> {
//   console.log('user connected');
//   socket.on('setUsername', function(data) {
//     console.log(data);
    
//     if(users.indexOf(data) > -1) {
//        socket.emit('userExists', data + ' username is taken! Try some other username.');
//     } else {
//        users.push(data);
//        socket.emit('userSet', {username: data});
//     }
//  });
 
//  socket.on('msg', function(data) {
//     //Send message to everyone
//     io.sockets.emit('newmsg', data);
//  })
// });

io.on('connection',(socket)=>{

  console.log('new connection made.');


  socket.on('join', function(data){
    //joining
    socket.join(data.room);

    console.log(data.user + 'joined the room : ' + data.room);

    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined'});
  });


  socket.on('leave', function(data){
  
    console.log(data.user + 'left the room : ' + data.room);

    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

    socket.leave(data.room);
  });

  socket.on('message',function(data){

    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  })
});


//Connect to local MongoDB collection
mongoose.connect(config.connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(cors({origin: "*" }))


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/",(req,res)=>{
    res.send('Server started');
});



//const details = require();

app.post("/sendmail",(req,res)=>{
    console.log("request came");
    let user=req.body;
    sendMail(user,info=>{
        console.log('Mail has been sent');
        res.send(info);
    });

});

//nodemailer function
async function sendMail(user, callback){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'steersharesupp@gmail.com', //ENTER YOUR EMAIL
            pass: 'steershare123' //ENTER YOUR PASSWORD
        }

    });

    //Mail specifics
    let mailOptions = {
        from: 'virajrajopadhye@gmail.com',
        to: user.email,
        subject: "RIDE BOOKING CONFIRMATION!",
        html: `<head>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Receipt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
         * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
         */
        @media screen {
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
          }
      
          @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
          }
        }
      
        /**
         * Avoid browser level font resizing.
         * 1. Windows Mobile
         * 2. iOS / OSX
         */
        body,
        table,
        td,
        a {
          -ms-text-size-adjust: 100%; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }
      
        /**
         * Remove extra space added to tables and cells in Outlook.
         */
        table,
        td {
          mso-table-rspace: 0pt;
          mso-table-lspace: 0pt;
        }
      
        /**
         * Better fluid images in Internet Explorer.
         */
        img {
          -ms-interpolation-mode: bicubic;
        }
      
        /**
         * Remove blue links for iOS devices.
         */
        a[x-apple-data-detectors] {
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-decoration: none !important;
        }
      
        /**
         * Fix centering issues in Android 4.4.
         */
        div[style*="margin: 16px 0;"] {
          margin: 0 !important;
        }
      
        body {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      
        /**
         * Collapse table borders to avoid space between cells.
         */
        table {
          border-collapse: collapse !important;
        }
      
        a {
          color: #1a82e2;
        }
      
        img {
          height: auto;
          line-height: 100%;
          text-decoration: none;
          border: 0;
          outline: none;
        }
        </style>
      
      </head>
      <body style="background-color: #D2C7BA;">
      
        <!-- start preheader -->
        <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->
      
        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
      
          <!-- start logo -->
          <tr>
            <td align="center" bgcolor="#D2C7BA">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                      <img src="" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end logo -->
      
          <!-- start hero -->
          <tr>
            <td align="center" bgcolor="#D2C7BA">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Thank you for choosing us!</h1>
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end hero -->
      
          <!-- start copy block -->
          <tr>
            <td align="center" bgcolor="#D2C7BA">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start copy -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Here is a summary of your recent booking. If you have any questions or concerns about your booking, please <a href="mailto:virajrajopadhye@gmail.com?subject=Concerns%20regarding%20my%20ride">contact us</a>.</p>
                  </td>
                </tr>
                <!-- end copy -->
      
                <!-- start receipt table -->
                <tr>
                  <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="left" bgcolor="#D2C7BA" width="75%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>Booking #</strong></td>
                        <td align="left" bgcolor="#D2C7BA" width="25%" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>0000224</strong></td>
                      </tr>
                      <tr>
                        <td align="left" width="75%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">Travel Date</td>
                        <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${user.date}</td>
                      </tr>
                      <tr>
                        <td align="left" width="75%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">Trip will start at</td>
                        <td align="left" width="25%" style="padding: 6px 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">${user.time}</td>
                      </tr>
                     
                      <tr>
                        <td align="left" width="75%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>Total</strong></td>
                        <td align="left" width="25%" style="padding: 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-top: 2px dashed #D2C7BA; border-bottom: 2px dashed #D2C7BA;"><strong>$${user.price}</strong></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- end reeipt table -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end copy block -->
      
          <!-- start receipt address block -->
          <tr>
            <td align="center" bgcolor="#D2C7BA" valign="top" width="100%">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                  <td align="center" valign="top" style="font-size: 0; border-bottom: 3px solid #d4dadf">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="left" valign="top" width="300">
                    <![endif]-->
                    <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                        <tr>
                          <td align="left" valign="top" style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p><strong>Starting Point</strong></p>
                            <p>${user.start}<br></p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <td align="left" valign="top" width="300">
                    <![endif]-->
                    <div style="display: inline-block; width: 100%; max-width: 50%; min-width: 240px; vertical-align: top;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 300px;">
                        <tr>
                          <td align="left" valign="top" style="padding-bottom: 36px; padding-left: 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p><strong>Destination</strong></p>
                            <p>${user.end}<br></p>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end receipt address block -->
      
          <!-- start footer -->
          <tr>
            <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
              <!--[if (gte mso 9)|(IE)]>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
              <td align="center" valign="top" width="600">
              <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
      
                <!-- start permission -->
                <tr>
                  <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request for ride booking for your account. If you didn't request a ride you can safely delete this email.</p>
                  </td>
                </tr>
                <!-- end permission -->
      
                <!-- start unsubscribe -->
                <tr>
                  <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">To stop receiving these emails, you can <a href="#" target="_blank">unsubscribe</a> at any time.</p>
                    <p style="margin: 0;">360, Huntington Avenue, Boston, 02120</p>
                  </td>
                </tr>
                <!-- end unsubscribe -->
      
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
          <!-- end footer -->
      
        </table>
        <!-- end body -->
      
      </body>`
    };

    let info = await transporter.sendMail(mailOptions);
    callback(info);
}




//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let nodemailer = require('nodemailer');


//Initialize app
let initApp = require('./app/app');
initApp(app);


server.listen(port);

console.log('RESTful API server started on: ' + port);