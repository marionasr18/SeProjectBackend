const pool =  require ('../../config/databse')
const jwt = require('jsonwebtoken');

module.exports={
  
   sendRequest:(data,callback)=>{
    let token =data.sender_id; // Your JWE-encrypted JWT token
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
            'INSERT INTO tbl_connections (sender_id, receiver_id) VALUES (?, ?)',
            [
                userId,
                data.receiver_id
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },

  


deletePendingRequest: (requestId, callback) => {
    const checkStatusQuery = 'SELECT status FROM tbl_connections WHERE connection_id = ?';
    const deleteRequestQuery = 'DELETE FROM tbl_connections WHERE connection_id = ? AND status = ?';
  
    pool.query(checkStatusQuery, [requestId], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
  
      if (results.length === 0) {
        return callback('Record found empty');
      }
  
      const status = results[0].status;
  
      if (status !== 'pending') {
        return callback(`Cannot delete connection with status "${status}"`);
      }
  
      pool.query(deleteRequestQuery, [requestId, 'pending'], (error, results, fields) => {
        if (error) {
          return callback(error);
        }
  
        return callback(null, results[0]);
      });
    });
  },
  
// deleteAcceptedRequest:(connection_Id,callback)=>{
//     pool.query('DELETE FROM tbl_connections WHERE connection_id = ? AND status = ?',[connection_Id, 'accepted'],
//     (error,results,fields)=>{
//         if(error){
//             return  callback(error);
//         }
//         return callback(null,results[0]);
//     })
// },

deleteAcceptedRequest: (requestId, callback) => {
    const checkStatusQuery = 'SELECT status FROM tbl_connections WHERE connection_id = ?';
    const deleteRequestQuery = 'DELETE FROM tbl_connections WHERE connection_id = ? AND status = ?';
  
    pool.query(checkStatusQuery, [requestId], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
  
      if (results.length === 0) {
        return callback('Record not found');
      }
  
      const status = results[0].status;
  
      if (status !== 'accepted') {
        return callback(`Cannot delete connection with status "${status}"`);
      }
  
      pool.query(deleteRequestQuery, [requestId, 'accepted'], (error, results, fields) => {
        if (error) {
          return callback(error);
        }
  
        return callback(null, results[0]);
      });
    });
  },

getRequest: callback=>{
    pool.query('Select * from tbl_connections',[],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
    },
getMyFriends: (Id, callback) => {
  let token = Id; // Your JWE-encrypted JWT token
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
    `
    SELECT *
    FROM tbl_users u 
    JOIN tbl_connections c ON u.user_id = c.sender_id
    WHERE c.status = 'accepted' AND (c.receiver_id = ?)    
  `,
    [userId,userId],
    (error, results, fields) => {
      console.log(results,'results')
      if (results?.length === 0) {
        return callback('No accpeted requests');
      }
    
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
},


getPendingRequest: (Id, callback) => {
  let token = Id; // Your JWE-encrypted JWT token
  // token = token.slice(7)
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
    `
    SELECT u.username, u.email, u.profile_picture, c.connection_id
    FROM tbl_users u JOIN tbl_connections c ON u.user_id = c.sender_id
    WHERE c.status = 'pending' AND c.receiver_id = ?;
  `,
    [userId],
    (error, results, fields) => {
      console.log(results,'results')
      if (results.length === 0) {
        return callback('No pending requests');
      }
    
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
},
acceptFriendRequest: (connectionId, callback) => {
  const checkStatusQuery = 'SELECT status FROM tbl_connections WHERE connection_id = ? and status="pending"';
  pool.query(checkStatusQuery, [connectionId], (error, results, fields) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback('Record not found');
    }

    const status = results[0].status;

    // if (status !== 'accepted') {
    //   return callback(`Cannot delete connection with status "${status}"`);
    // }
  pool.query(
    'UPDATE tbl_connections SET status = "accepted" WHERE connection_id = ? AND status = "pending"',

      [connectionId],
      (error, results, fields) => {
          if (error) {
              return callback(error);
          }
          
          return callback(null, results);
      }
  )});
},
rejectFriendRequest: (connectionId, callback) => {
  const checkStatusQuery = 'SELECT status FROM tbl_connections WHERE connection_id = ? and status="pending"';
  pool.query(checkStatusQuery, [connectionId], (error, results, fields) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback('Record not found');
    }

    const status = results[0].status;

    if (status !== 'accepted') {
      return callback(`Cannot delete connection with status "${status}"`);
    }

  pool.query(
    'UPDATE tbl_connections SET status = "rejected" WHERE connection_id = ? AND status = "pending"',

      [connectionId],
      (error, results, fields) => {
          if (error) {
              return callback(error);
          }
          
          
          return callback(null, results);
      }
  )});
}

  

}


