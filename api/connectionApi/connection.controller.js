// const {sign}= require('jsonwebtoken');
const {sendRequest, deleteAcceptedRequest,deletePendingRequest,getPendingRequest, getRequest,acceptFriendRequest,rejectFriendRequest,getMyFriends} = require('./connection.service');

module.exports = {
    sendFriendRequest:(req,res)=>{
        const body = req.body;
          sendRequest(body,(err,results)=>{
            if(err){
                console.log(err);
                //console.log(results)
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
  
        deletePendingRequest:(req,res)=>{
            const id = req.params.id;
            deletePendingRequest(id,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:'Record not found'
                    })
                }
                return res.status(200).json({
                    success:1,
                    message:'Request deleted successfully'
                })
            })
        },

        deleteAcceptedRequest:(req,res)=>{
            const id = req.params.id;
            deleteAcceptedRequest(id,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:'Record not found'
                    })
                }
                return res.status(200).json({
                    success:1,
                    message:'Request deleted successfully'
                })
            })
        },
      
        getPendingRequest:(req,res)=>{
            const id = req.params.id;
            getPendingRequest(id,(err,results)=>{
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
        getMyFriends:(req,res)=>{
            const id = req.params.id;
            getMyFriends(id,(err,results)=>{
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

            getRequest:(req,res)=>{
                getRequest((err,results)=>{
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
            acceptFriendRequest: (req, res) => {
                const connectionId = req.params.id;
                
            
                acceptFriendRequest(connectionId, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: 'Failed to update request'
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: 'Request updated successfully'
                    });
                });
            },
            rejectFriendRequest: (req, res) => {
                const connectionId = req.params.id;
                
            
                rejectFriendRequest(connectionId, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: 'Failed to update request'
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: 'Request updated successfully'
                    });
                });
            }
        }
            

        // getPendingRequest:(req,res)=>{
        //     const id = req.params.id;
        //     getPendingRequest(id,(err,results)=>{
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
    
    
       