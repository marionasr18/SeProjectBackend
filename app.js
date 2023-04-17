const express = require("express");
// const bodyParser = require("body-parser");
const cors = require('cors')
// const encoder = bodyParser.urlencoded();
const userRouter  = require('./api/usersApi/user.router');

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/users',userRouter)

  app.get('/api',(req,res)=>{
      res.json({
          success:1,
          message:'This app is working'
      })
  })
app.listen(3000,()=>{
    console.log('Server up and running')
});

