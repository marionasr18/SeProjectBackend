const {create,getEventToJoinnById,deleteEventById,requestToJoin,acceptOrDeclineRequest,viewRequestStatus,getAllCreatedEvents,getRequestByEventId} = require('./event.service');
// const {sign}= require('jsonwebtoken');

module.exports={
createEvent:(req,res)=>{
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
requestToJoin:(req,res)=>{
    const body = req.body;
    requestToJoin(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
            success:0,
            message:res
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
acceptOrDeclineRequest:(req,res)=>{
    const body = req.body;
    acceptOrDeclineRequest(body,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
            success:0,
            message:res
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
getEventToJoinnById:(req,res)=>{
    const id = req.params.id;
    getEventToJoinnById(id,(err,results)=>{
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
viewRequestStatus:(req,res)=>{
    const id = req.params.id;
    viewRequestStatus(id,(err,results)=>{
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
getAllCreatedEvents:(req,res)=>{
    const id = req.params.id;
    getAllCreatedEvents(id,(err,results)=>{
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
getRequestByEventId:(req,res)=>{
    const id = req.params.id;
    getRequestByEventId(id,(err,results)=>{
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
// getSportByName:(req,res)=>{
//     const name = req.params.name;
//     getSportByName(name,(err,results)=>{
//     console.log(results)

//         if(err){
//             console.log(err);
//             return res.status(500).json({
//                 success:0,
//             message:'Record not found'
//         })
//         }
//         return res.status(200).json({
//             success:1,
//             data:results
//         })
//     })
// },

// getEvent:(req,res)=>{
//     getEvent((err,results)=>{
//         if(err){
//             console.log(err);
//             return res.json({
//                 success:results,
//             message:err
//         })
//         }
       
//         return res.status(200).json({
//             success:1,      
//             data:results
//         })
//     })
// },
deleteEventById:(req,res)=>{
    const id = req.params.id;
    deleteEventById(id,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                success:0,
                message:'Record not found'
            })
        }
        return res.status(200).json({
            success:1,
            message:'Sport deleted successfully'
        })
    })
}


}