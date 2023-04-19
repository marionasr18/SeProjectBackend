const pool = require ('../../config/databse')

module.exports={
    create:(data,callback)=>{
        pool.query(
            'insert into tbl_sport(sport_name,description ) values(?,?)',
            [
                data.sport_name ,
                data.description
            ],
            (error,results,fields)=>{
                if(error){
                    callback(error)
                }
                return callback(null,results)
            }
        )
    },
    
    getSport: callback=>{
    pool.query('Select * from tbl_sport',[],(error,results,field)=>{
    if(error){
       return callback(error);
    }
    return callback(null,results);
})
    },


    getSportById :(Id,callback)=>{
        pool.query('select * from tbl_sport where sport_id=?',[Id],
        (error,results,fields)=>{
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    },
    getSportByName :(Name,callback)=>{
      
        pool.query('select * from tbl_sport where sport_name =?',[Name],
        (error,results,fields)=>{
            console.log(results)
            if(error){
              return  callback(error);
            }
            return callback(null,results[0]);
        }
        )
    }
}