const {verify}= require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get('authorization');
        if(token){
token = token.slice(7)
verify(token,'qwe1234',(error,decoded)=>{
    if(error){
        res.json({
            success:0,
            message:'Invalid Token',
        })
    }
    else{
        next()
    }
})
        }else{
            res.json({
                success:0,
                messag:'AccessDenied: Unauthorized user'
            })
        }
    }
}