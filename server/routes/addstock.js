const express = require('express');
const client = require('pg').Client
const router = express.Router();
qs = require('querystring');


const clientnew = new client({
  user: "beta_gorn",
  password: "beta1jhd74!23ndhdkvjornQ",
  host: "db-beta.gornapp.com",
  port: "5432",
  database: "akhil_test_db"
})
clientnew.connect().then(() => console.log("Db connected"));
//const axios = require('axios');
router.post('/', (req, resp) => {
  //   let searchkey =  req.query.key;
  console.dir(req.body);
  if(isNaN(req.body.MarketCap) || isNaN(req.body.CurrentMarketPrice) || isNaN(req.body.Stock) || isNaN(req.body.Dividend) || isNaN(req.body.ROCE) || isNaN(req.body.ROE) || isNaN(req.body.Debt) || isNaN(req.body.EPS) || isNaN(req.body.Reserves))
  {
    resp.send(new Error('Validation Error'));
  }
  else{
    sql = `insert into companies("MarketCap","CurrentMarketPrice","Stock","Dividend","ROCE","ROE","Debt","EPS","Reserves","name","shortname") values('${req.body.MarketCap}','${req.body.CurrentMarketPrice}','${req.body.Stock}','${req.body.Dividend}','${req.body.ROCE}','${req.body.ROE}','${req.body.Debt}','${req.body.EPS}','${req.body.Reserves}','${req.body.name}','${req.body.shortname}')`

    console.log(sql);
    clientnew.query(sql).then((res) => {
      resp.send(res.rows);
    }).catch((err) => resp.send(err))  
  }
 
})
module.exports = router;