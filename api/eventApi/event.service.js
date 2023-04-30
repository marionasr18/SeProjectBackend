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
    requestToJoin:(data,callback)=>{
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
            'INSERT INTO tbl_event_participants (event_id, user_id) VALUES (?,?)',
            [ 
                data.event_id,
                userId,
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    acceptOrDeclineRequest:(data,callback)=>{
       
        pool.query(
            'UPDATE tbl_event_participants SET status = ? WHERE event_id = ? AND user_id = ?',
  [data.status, data.eventId, data.userId],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    getAllCreatedEvents:(id,callback)=>{
        let token = id; // Your JWE-encrypted JWT token
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
            'SELECT e.event_id, e.event_name, e.event_date, e.event_location, e.event_description, s.sport_name, f.field_name FROM tbl_events e JOIN tbl_field f ON e.field_id = f.field_id JOIN tbl_sport s ON e.sport_id = s.sport_id WHERE e.user_id = ? ORDER BY e.event_date ASC',
  [userId],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    getRequestByEventId:(Id,callback)=>{
    
        pool.query(
            'SELECT u.user_id, u.username, u.email, u.dob, u.address, u.gender, u.phoneNumber, ep.status FROM tbl_event_participants ep JOIN tbl_users u ON ep.user_id = u.user_id WHERE ep.event_id =?;',
  [Id],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    

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
        pool.query(`SELECT e.event_id, e.event_name, e.start_time, e.end_time, e.event_date, e.event_location, e.event_description, s.sport_name, f.field_name, u.username as created_by
        FROM tbl_events e
        JOIN tbl_field f ON e.field_id = f.field_id
        JOIN tbl_sport s ON e.sport_id = s.sport_id
        JOIN tbl_users u ON e.user_id = u.user_id
        WHERE e.user_id <> ?
        AND e.event_id NOT IN (
            SELECT event_id
            FROM tbl_event_participants
            WHERE user_id = ?
        )
       
        ORDER BY e.event_date ASC;`, [userId, userId],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results);
        }
        )
    },
    viewRequestStatus :(Id,callback)=>{
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
        pool.query(`SELECT e.event_id, e.event_name, e.event_date, e.event_location, e.event_description, 
        s.sport_name, f.field_name, ep.status
 FROM tbl_events e
 JOIN tbl_field f ON e.field_id = f.field_id
 JOIN tbl_sport s ON e.sport_id = s.sport_id
 JOIN tbl_event_participants ep ON e.event_id = ep.event_id
 WHERE ep.user_id = ? AND ep.user_id <> e.user_id
 ORDER BY e.event_date ASC;`, [userId],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results);
        }
        )
    },
   
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