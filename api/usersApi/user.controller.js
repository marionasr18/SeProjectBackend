const {create,getUserById,getUsers,getUserByUserEmail} = require('./user.service');
const {genSaltSync,hashSync,compareSync }= require ('bcrypt')
const {sign}= require('jsonwebtoken');

module.exports={
createUser:(req,res)=>{
    const body = req.body;
     const salt = genSaltSync(10);
     body.password = hashSync(body.password,salt);
    create(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
            success:0,
            message:'Error connection'
        })
        }
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},
getUserById:(req,res)=>{
    const id = req.params.id;
    getUserById(id,(err,results)=>{
    console.log(results)

        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
            message:'Record not found'
        })
        }
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},
login:(req,res)=>{
    const body = req.body;
    console.log(body)
    getUserByUserEmail(body.username,(err,results)=>{
        if(err){
            console.log(err);
           }
           if(!results){
            return res.json({
            success:0,
            message:'Invalid Email or Password'
        })
           }
           const result = compareSync(body.password,results.passwrd)
           if(result){
            results.password=undefined;
            const jsontoken = sign({result:results},'qwe124',{
                expiresIn:'1h'
            })
        return res.json({
            success:1,
message:'Login successfully',
token:jsontoken,
        }) 
    }else{
        res.json({
            success:0,
            message:'Invalid Email or Password'

        }) 
    }
    })
},
getUsers:(req,res)=>{
    getUsers((err,results)=>{
        if(err){
            console.log(err);
            return res.json({
                success:results,
            message:err
        })
        }
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},

}