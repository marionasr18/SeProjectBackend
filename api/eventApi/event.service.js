const pool = require ('../../config/databse')
const jwt = require('jsonwebtoken');


module.exports={
    create:(data,callback)=>{
        let token = data.user_id; // Your JWE-encrypted JWT token
// token = token.slice(7)
const key = 'qwe124'; // Your JWE key
let userId=''
jwt.verify(token, key, (err, decodedToken) => {
  if (err) {
return callback(err)  
} else {
    console.log(decodedToken.result,'dedecodedToken')
    const res =  decodedToken.result
     userId =res.user_id; // Access the user ID from the decoded token
    // Use the user ID as needed
  }
});
        pool.query(
            'INSERT INTO tbl_events (event_name, event_date, event_location, event_description, user_id, sport_id, field_id,start_time,end_time,capacity) values (?, ?, ?, ?, ?, ?, ?,?,?,?)',
            [
                data.event_name ,
                data.event_date,
                data.event_location,
                data.event_description,
                userId,
                data.sport_id,
                data.field_id,
                data.start_time,
                data.end_time,
                data.capacity,
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    
//     getEventToJoin: callback=>{
//         pool.query(`SELECT e.event_id, e.event_name, e.event_date, e.event_location, e.event_description, s.sport_name, f.field_name
//         FROM tbl_events e
//         JOIN tbl_field f ON e.field_id = f.field_id
//         JOIN tbl_sport s ON e.sport_id = s.sport_id
//         WHERE e.event_date > NOW() AND e.user_id <> ?
//         AND s.sport_id NOT IN (
//           SELECT sport_id FROM tbl_user_sports WHERE user_id = ?
//         )
//         ORDER BY e.event_date ASC;`, [userId, userId],(error,results,field)=>{
//     if(error){
//        return callback(error);
//     }
//     return callback(null,results);
// })
//     },


    getEventToJoinnById :(Id,callback)=>{
        let token =Id; // Your JWE-encrypted JWT token
        // token = token.slice(7)
        const key = 'qwe124'; // Your JWE key
        let userId=''
        jwt.verify(token, key, (err, decodedToken) => {
          if (err) {
        return callback(err)  
        } else {
            console.log(decodedToken.result,'dedecodedToken')
            const res =  decodedToken.result
             userId =res.user_id; // Access the user ID from the decoded token
            // Use the user ID as needed
          }
        });
        pool.query(`SELECT e.event_id, e.event_name, e.event_date, e.event_location, e.event_description, s.sport_name, f.field_name
        FROM tbl_events e
        JOIN tbl_field f ON e.field_id = f.field_id
        JOIN tbl_sport s ON e.sport_id = s.sport_id
        WHERE e.event_date > NOW() AND e.user_id <> ?
        AND s.sport_id NOT IN (
          SELECT sport_id FROM tbl_user_sports WHERE user_id = ?
        )
        ORDER BY e.event_date ASC;`, [userId, userId],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    },
    // getSportByName :(Name,callback)=>{
      
    //     pool.query('select * from tbl_sport where sport_name =?',[Name],
    //     (error,results,fields)=>{
    //         console.log(results)
    //         if(error){
    //           return  callback(error);
    //         }
    //         return callback(null,results[0]);
    //     }
    //     )
    // },
    deleteEventById :(Id,callback)=>{
        pool.query('DELETE FROM tbl_sport WHERE sport_id=?',[Id],
        (error,results,fields)=>{
            if(error){
                return  callback(error);
            }
            return callback(null,results[0]);
        })
    }
    
    
}