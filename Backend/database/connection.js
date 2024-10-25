const mysql = require('mysql');


const db = mysql.createPool({
    host: 'bncvmljswjf6puzcuhuf-mysql.services.clever-cloud.com',
    user:'uhpygwdzyl4luoy1',
    password:'oSIref3uFecmHoN9Lg9Z',
    database: "bncvmljswjf6puzcuhuf",
    port:3306
})

module.exports = async (query) => {
return new Promise((resolve, reject)=>{
    db.getConnection((err, connection)=>{
        if(err) reject(err)
        connection.query(query, (err, results)=>{
            if(err) reject (err)
            else{
                resolve(results)
                connection.release()
        }
           
            })
    })


})
    
}