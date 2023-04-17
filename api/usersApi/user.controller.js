const {create,getUserById,getUsers} = require('./user.service');
const {genSaltSync,hashSync }= require ('bcrypt')
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