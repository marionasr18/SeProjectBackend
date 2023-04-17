const pool = require ('../../config/databse')

module.exports={
    create:(data,callback)=>{
        pool.query(
            'insert into users(user_id ,username ,email,dob ,address ,passwrd,gender,phoneNumber   ) values(0,?,?,?,?,?,?,?)',
            [
                data.username ,
                data.email,
                data.dob ,
                data.address ,
                data.password,
                data.gender ,
                data.phoneNumber  ,
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    getUsers: callback=>{
pool.query('Select * from users',[],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
    },
    getUserById :(Id,callback)=>{
        pool.query('select * from users where user_id=?',[Id],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results);
        }
        )
    }
}