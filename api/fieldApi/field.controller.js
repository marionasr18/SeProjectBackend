const {create,getFieldById,getField, getFieldByName,deleteFieldById} = require('./field.service');
// const {sign}= require('jsonwebtoken');

module.exports={
createField:(req,res)=>{
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
getFieldById:(req,res)=>{
    const id = req.params.id;
    getFieldById(id,(err,results)=>{
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
getFieldByName:(req,res)=>{
    const name = req.params.name;
    getFieldByName(name,(err,results)=>{
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

getField:(req,res)=>{
    getField((err,results)=>{
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
deleteFieldById:(req,res)=>{
    const id = req.params.id;
    deleteFieldById(id,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message:'Record not found'
            })
        }
        return res.status(200).json({
            success:1,
            message:'Field deleted successfully'
        })
    })
}


}