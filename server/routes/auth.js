const express= require('express');
const client = require('pg').Client


const clientnew = new client({
  user : "beta_gorn",
  password: "beta1jhd74!23ndhdkvjornQ",
  host: "db-beta.gornapp.com",
  port: "5432",
  database: "akhil_test_db"
})

clientnew.connect().then(() => {});
router.post('/login', (req,resp) => {
    console.log(req.body);
    resp.send(req.body);
 /*  clientnew.query(sql).then((res) => {
        resp.send(res.rows);
      //  console.log('response', res)
    }).catch((err) => resp.send(err))
     */
})
module.exports = router;
