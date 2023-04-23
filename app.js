const express = require("express");
// const bodyParser = require("body-parser");
const cors = require('cors')
// const encoder = bodyParser.urlencoded();
const userRouter  = require('./api/usersApi/user.router');
const sportRouter  = require('./api/sportApi/sport.router');
const fieldRouter  = require('./api/fieldApi/field.router');
const eventRouter  = require('./api/eventApi/event.router');
const connectionRouter  = require('./api/connectionApi/connection.router');

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/sports',sportRouter)
app.use('/api/fields',fieldRouter)
app.use('/api/events',eventRouter)
app.use('/api/connections',connectionRouter)

  app.get('/api',(req,res)=>{
      res.json({
          success:1,
          message:'This app is working'
      })
  })
app.listen(3001,()=>{
    console.log('Server up and running')
});

