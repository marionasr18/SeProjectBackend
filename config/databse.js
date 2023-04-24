const {createPool} = require('mysql2');
//Omar DB

const pool = createPool({
    port:3306,
     host: "localhost",
     user: "root",
     password: "root",
     database: "SportsBuddyEdited",
     connectionLimit:10,

})

//Mario DB
//  const pool = createPool({
//      port:3307,
//       host: "localhost",
//       user: "root",
//       password: "R@ggaboom1",
//       database: "SportsBuddy",
//       connectionLimit:10,

//  })

module.exports = pool;