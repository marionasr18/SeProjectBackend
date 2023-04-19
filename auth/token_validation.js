const {verify}= require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token =req.get('authorization');
        console.log(token)
        if(token){
token = token.slice(7)
console.log('token',token)
console.log('token 1',token)
verify(token,'qwe124',(error,decoded)=>{
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