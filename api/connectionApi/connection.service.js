const pool =  require ('../../config/databse')

module.exports={
  
   sendRequest:(data,callback)=>{
        pool.query(
            'INSERT INTO tbl_connections (sender_id, receiver_id) VALUES (?, ?)'
            [
                data.sender_id ,
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
        return callback('Record top g found');
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
        return callback('Record omar god found');
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

getPendingRequest :(Id,callback)=>{
    pool.query(`
    SELECT tbl_users.username, tbl_users.email
    FROM tbl_users INNER JOIN tbl_connections ON tbl_users.user_id = tbl_connections.sender_id
    WHERE tbl_connections.receiver_id = ? AND tbl_connections.status = 'pending';
  `),[Id],
    (error,results,fields)=>{
        if(error){
          return  callback(error);
        }
        return callback(null,results[0]);
    }
    
},

}


