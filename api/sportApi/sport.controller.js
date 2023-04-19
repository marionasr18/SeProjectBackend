const {create,getSportById,getSport, getSportByName} = require('./sport.service');
// const {sign}= require('jsonwebtoken');

module.exports={
createSport:(req,res)=>{
    const body = req.body;
      create(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
            success:0,
            message:'Error connection'
        })
        }
        console.log(req.body)
        // console.log(results)
        return res.status(200).json({
            success:1,
            data:results
        })
    })
},
getSportById:(req,res)=>{
    const id = req.params.id;
    getSportById(id,(err,results)=>{
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
getSportByName:(req,res)=>{
    const name = req.params.name;
    getSportByName(name,(err,results)=>{
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

getSport:(req,res)=>{
    getSport((err,results)=>{
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