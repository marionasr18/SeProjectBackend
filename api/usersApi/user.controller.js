const {create,getUserById,getUsers,getUserByUserEmail,updateUserById,updateUserProfileById, getUserByName} = require('./user.service');
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
            message:err
        })
        }
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},
getUserById:(req,res)=>{
    const id = req.get('authorization');
    console.log(id)
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

getUserByName:(req,res)=>{
    const id =  req.get('authorization');
    const username = req.params.name;
    let data = {id:id,
    name:username}
    console.log(data)
    getUserByName(data,(err,results)=>{
    console.log(results,'hereeeeeee')

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
    console.log(body,'body')
    getUserByUserEmail(body.username,(err,results)=>{
        console.log(results,'results')
        if(err){
            return res.json({
                success:0,
                message:'Error'
            })           }
           if(!results){
            return res.json({
            success:0,
            message:'Invalid Email or Password'
        })
           }
           console.log(body.password,'body.password')
           console.log(',results.password',results.password)
           const result =compareSync (body.password,results.password)
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
      return  res.json({
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
        console.log(results)
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},
deleteUserById:(req,res)=>{
    const id = req.params.id;
    deleteUserById(id,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message:'Record not found'
            })
        }
        return res.status(200).json({
            success:1,
            message:'User deleted successfully'
        })
    })
}, 
updateUserById: (req, res) => {
    const id = req.params.id;
    const { username, email, password } = req.body;

    updateUserById(id, username, email, password, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Failed to update user'
            });
        }
        return res.status(200).json({
            success: 1,
            message: 'User updated successfully'
        });
    });
}, 
updateUserProfileById:(req, res) => {
    const body = req.body;

    updateUserProfileById(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Failed to update user'
            });
        }
        return res.status(200).json({
            success: 1,
            message: 'User updated successfully'
        });
    });
}, 



}