const pool = require ('../../config/databse')
const jwt = require('jsonwebtoken');


module.exports={
    create:(data,callback)=>{
        pool.query(
            'insert into tbl_users(username,email,dob ,address ,passwrd,gender,phoneNumber,profile_picture ) values(?,?,?,?,?,?,?,?)',
            [
                data.username ,
                data.email,
                data.dob ,
                data.address ,
                data.password,
                data.gender ,
                data.phoneNumber,
                data.profile_picture
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
     userId = decodedToken.result.user_id; // Access the user ID from the decoded token
     // Use the user ID as needed
  }
});


pool.query('Select * from tbl_users where user_id=?',[userId],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})

},



getUserByUsername :(name,callback)=>{

pool.query('Select * from tbl_users where username=?',[name],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
},
    // getUserByName :(username,callback)=>{

    //     // let token = Id; // Your JWE-encrypted JWT token
    //     // token = token.slice(7)
    //     // const key = 'qwe124'; // Your JWE key
    //     // let userId=''
    //     // jwt.verify(token, key, (err, decodedToken) => {
    //     // if (err) {
    //     // return callback(err)  
    //     // } else {
    //     //     console.log(decodedToken)
    //     //     const userId = decodedToken.user_id; // Access the user ID from the decoded token
    //     //     // Use the user ID as needed
    //     // }
    //     // });

    //     pool.query('SELECT * FROM tbl_users WHERE LOWER(username) LIKE LOWER(?)',
    //     [`%${username}%`],
    //     (error,results,fields)=>{
    //         if(error){
    //           return  callback(error);
    //         }
    //         return callback(null,results);
    //     }
    //     )
    // },
    getUserByName: (data, callback) => {
      let  name = data.name
        let token = data.id; // Your JWE-encrypted JWT token
        token = token.slice(7)
        const key = 'qwe124'; // Your JWE key
        let userId = '';
        jwt.verify(token, key, (err, decodedToken) => {
          if (err) {
            return callback(err);
          } else {
            console.log(decodedToken.result, 'decodedToken');
            const res = decodedToken.result;
            userId = res.user_id; // Access the user ID from the decoded token
            // Use the user ID as needed
          }
        });
        pool.query(
            `SELECT u.*,
        CASE 
            WHEN c.status = 'pending' THEN 'pending'
            WHEN c.status = 'accepted' THEN 'connected'
            ELSE 'notYet'
        END AS flag
 FROM tbl_users u
 LEFT JOIN tbl_connections c ON (u.user_id = c.sender_id AND c.receiver_id = ?)
                             OR (u.user_id = c.receiver_id AND c.sender_id = ?)
 WHERE LOWER(u.username) LIKE LOWER(?);
 `,
// `SELECT u.*, 
// CASE 
//     WHEN c.status = 'pending' THEN 'pending'
//     WHEN c.status = 'accepted' THEN 'connected'
//     ELSE 'pending'
// END AS flag,
// CASE
//     WHEN EXISTS (
//         SELECT 1
//         FROM tbl_connections
//         WHERE (sender_id = ? AND receiver_id = u.user_id AND status = 'accepted')
//            OR (sender_id = u.user_id AND receiver_id = ? AND status = 'accepted')
//     )
//     THEN true
//     ELSE false
// END AS is_friend
// FROM tbl_users u
// LEFT JOIN tbl_connections c ON (u.user_id = c.sender_id AND c.receiver_id = ?)
//                          OR (u.user_id = c.receiver_id AND c.sender_id = ?)
// WHERE LOWER(u.username) LIKE LOWER(?);
// `
 [[userId], [userId], `%${name}%`],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
            'UPDATE tbl_users SET username = ?, email = ?, passwrd = ? WHERE user_id = ?',
            [username, email, password, id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                console.log(username,password,email);
                return callback(null, results);
            }
        );
    },
    // updateUserProfileById: (data, callback) => {
    //     let token = data.user_id; // Your JWE-encrypted JWT token
    //     token = token.slice(7)
    //     const key = 'qwe124'; // Your JWE key
    //     let userId=''
    //     jwt.verify(token, key, (err, decodedToken) => {
    //       if (err) {
    //           return callback(err) 
        
    //     } else {
    //         console.log(decodedToken.result,'dedecodedToken')
    //         const res =  decodedToken.result
    //          userId =res.user_id; // Access the user ID from the decoded token
    //         // Use the user ID as needed
    //       }

       
         
    //     pool.query(
    //         'UPDATE tbl_users SET email = ?,gender=?,phoneNumber=?,address=?, profile_picture = ? WHERE user_id = ?',
    //         [data.email,data.gender,data.phoneNumber,data.address,data.profile_picture, userId],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             console.log(id);
    //             return callback(null, results);
    //         }
    //     );
    // })}
    updateUserProfileById: (data, callback) => {
        let token = data.user_id; // Your JWE-encrypted JWT token
        token = token.slice(7)
        const key = 'qwe124'; // Your JWE key
        let userId = '';
      
        jwt.verify(token, key, (err, decodedToken) => {
          if (err) {
            return callback(err);
          } else {
            console.log(decodedToken.result, 'decodedToken');
            const res = decodedToken.result;
            userId = res.user_id; // Access the user ID from the decoded token
            // Use the user ID as needed
      
            pool.query(
              'UPDATE tbl_users SET email = ?,gender=?,phoneNumber=?,address=?, profile_picture = ? WHERE user_id = ?',
              [data.email, data.gender, data.phoneNumber, data.address, data.profile_picture, userId],
              (error, results, fields) => {
                if (error) {
                  return callback(error);
                }
                console.log(userId);
                return callback(null, results);
              }
            );
          }
        });
      }
      
    
    
}