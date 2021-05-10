const  express = require('express');
const client = require('pg').Client
const router = express.Router();


 const clientnew = new client({
    user : "",
    password: "",
    host: "",
    port: "5432",
    database: "akhil_test_db"
})

clientnew.connect().then(() => console.log("Db connected"));
//const axios = require('axios');
router.get('/', (req,resp) => {
    let searchkey =  req.query.key;
    let sql;
    if(req.query.key)
     sql = `select id,name,shortname from companies where (LOWER(name) like '%${searchkey}%') or (LOWER(shortname) like '%${searchkey}%')   limit 8`
   
    if(req.query.id) {
        sql = `select * from companies where id = ${req.query.id}`;
    }
    console.log(sql);
   clientnew.query(sql).then((res) => {
        resp.send(res.rows);
      //  console.log('response', res)
    }).catch((err) => resp.send(err))
    
})
module.exports = router;