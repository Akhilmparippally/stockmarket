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
 //   let searchkey =  req.query.key;
   sql = `insert into companies(MarketCap,CurrentMarketPrice,Stock,Dividend,ROCE,ROE,Debt,EPS,Reserves,name,shortname) values('${req.query.MarketCap}','${req.query.CurrentMarketPrice}','${req.query.Stock}','${req.query.Dividend}','${req.query.ROCE}','${req.query.ROE},'${req.query.Debt}','${req.query.EPS}','${req.query.Reserves}','${req.query.name}','${req.query.shortname}')`
   
    console.log(sql);
   clientnew.query(sql).then((res) => {
        resp.send(res.rows);
      //  console.log('response', res)
    }).catch((err) => resp.send(err))
    
})
module.exports = router;