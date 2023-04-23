const pool = require ('../../config/databse')
const jwt = require('jsonwebtoken');


module.exports={
    create:(data,callback)=>{
        pool.query(
            'insert into tbl_users(user_id,username ,email,dob ,address ,passwrd,gender,phoneNumber   ) values(6,?,?,?,?,?,?,?)',
            [
                data.username ,
                data.email,
                data.dob ,
                data.address ,
                data.password,
                data.gender ,
                data.phoneNumber
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
pool.query('Select * from tbl_users',[],(error,results,field)=>{
    console.log(results,'heyyyy')
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
    },
    getUserById :(Id,callback)=>{

let token = Id; // Your JWE-encrypted JWT token
token = token.slice(7)
const key = 'qwe124'; // Your JWE key
let userId=''
jwt.verify(token, key, (err, decodedToken) => {
  if (err) {
return callback(err)  
} else {
    console.log(decodedToken)
    const userId = decodedToken.user_id; // Access the user ID from the decoded token
    // Use the user ID as needed
  }
});
        pool.query('select * from tbl_users where user_id=?',[userId],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    },
    getUserByUserEmail :(username,callback)=>{
        console.log(username)
        pool.query('select * from tbl_users where username =?',[username],
        (error,results,fields)=>{
            console.log(results)
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    }, 
    deleteUserById :(Id,callback)=>{
        pool.query('DELETE FROM tbl_users WHERE user_id=?',[Id],
        (error,results,fields)=>{
            if(error){
                return  callback(error);
            }
            return callback(null,results[0]);
        })
    },
    updateUserById: (id, username, email, password, callback) => {
        pool.query(
            'UPDATE tbl_users SET username = ?, email = ?, password = ? WHERE user_id = ?',
            [username, email, password, id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                console.log(username,password,email);
                return callback(null, results);
            }
        );
    }
    
    
}