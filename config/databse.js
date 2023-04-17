const {createPool} = require('mysql2');

const pool = createPool({
    port:3307,
     host: "localhost",
     user: "root",
     password: "R@ggaboom1",
     database: "SportsBuddy",
     connectionLimit:10,

})

module.exports = pool;