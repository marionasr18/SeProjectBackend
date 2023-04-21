const pool = require ('../../config/databse')

module.exports={
    create:(data,callback)=>{
        pool.query(
            'insert into tbl_field(field_name, field_description, address, phone_number, sport_id) values(?,?,?,?,?)',
            [
                data.field_name ,
                data.field_description,
                data.address,
                data.phone_number,
                data.sport_id,
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    
    getField: callback=>{
    pool.query('Select * from tbl_field',[],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
    },


    getFieldById :(Id,callback)=>{
        pool.query('select * from tbl_field where field_id=?',[Id],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    },
    getFieldByName :(Name,callback)=>{
      
        pool.query('select * from tbl_field where field_name =?',[Name],
        (error,results,fields)=>{
            console.log(results)
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    },
    deleteSportById :(Id,callback)=>{
        pool.query('DELETE FROM tbl_field WHERE field_id=?',[Id],
        (error,results,fields)=>{
            if(error){
                return  callback(error);
            }
            return callback(null,results[0]);
        })
    }
    
    
}