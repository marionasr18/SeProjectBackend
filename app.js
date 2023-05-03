const express = require("express");
const axios = require('axios');

// const bodyParser = require("body-parser");
const cors = require('cors')
// const encoder = bodyParser.urlencoded();
const userRouter  = require('./api/usersApi/user.router');
const sportRouter  = require('./api/sportApi/sport.router');
const fieldRouter  = require('./api/fieldApi/field.router');
const eventRouter  = require('./api/eventApi/event.router');
const connectionRouter  = require('./api/connectionApi/connection.router');

const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/sports',sportRouter)
app.use('/api/fields',fieldRouter)
app.use('/api/events',eventRouter)
app.use('/api/connections',connectionRouter)

app.post("/createChatUser", async (req, res) => {
    const { username } = req.body;
    try{
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        {username: username, secret: "pass" + username, first_name: username, email: username + "@hotmail.com"},
        { headers: { "private-key" : "585ec951-ef05-440d-a18f-08b2922b63d9"} }
      )
      return res.status(r.status).json(r.data);
    }catch(e){
      return res.status(e.response.status).json(e.response.data);
    }
  });
  app.get('/api',(req,res)=>{
      res.json({
          success:1,
          message:'This app is working'
      })
  })
app.listen(3001,()=>{
    console.log('Server up and running')
});

app.post('/api/sendMail',(req,res)=>{
  const {recipient,subject,body} = req.body;
  if (!recipient ){
    return res.status(400).text('Invalid recipient');

  }

  var transporter = nodemailer.createTransport({
    host: 'mail.codefolio.site',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sportsbuddy@codefolio.site', // your domain email address
      pass: 'Dotnetserver_1' // your password
    }
  });
  
  var mailOptions = {
    from: 'sportsbuddy@codefolio.site',
    to: recipient,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.status(400).text(err);
    }
    else {
      console.log("Email sent");
      res.status(200).text('OK')
    }
  });

});


