const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let company = require('../models/Company')
const jwt = require('jsonwebtoken')
const seq = require('sequelize');
const jwtconfig = require('../config/configurations.json');
const checkauth = require('../middleware/check-auth');
Op=seq.Op;
router.get('/search',(req,response)=>{  
    let searchkey = req.query.key
    console.log(searchkey)
    company.findAll({
        attributes: ['id','name'],
        where: {
            name: {
                [Op.iLike]: `%${searchkey}%`
              }
        },
        limit: 8
      }).then(res=>{
          console.log('res',res)
        if(res.length>0) {
            response.send(res)
        }
        else {
            response.send(res)
        }
      }).catch(err=>{
        return response.status(500).json({
            error: err
        })
      })
   
})
router.get('/findbyid',(req,response)=>{  
    let searchid = req.query.id
    console.log(searchid)
    company.findAll({
        where: {
            id: searchid
        },
        limit: 1
      }).then(res=>{
          console.log('res',res)
        if(res.length>0) {
            response.send(res)
        }
        else {
            response.send(res)
        }
      }).catch(err=>{
        return response.status(500).json({
            error: err
        })
      })
   
})
router.post('/createcompany',checkauth,(req,response)=>{  
    if(isNaN(req.body.MarketCap) || isNaN(req.body.CurrentMarketPrice) || isNaN(req.body.Stock) || isNaN(req.body.Dividend) || isNaN(req.body.ROCE) || isNaN(req.body.ROE) || isNaN(req.body.Debt) || isNaN(req.body.EPS) || isNaN(req.body.Reserves))
  {
    resp.send(new Error('Validation Error'));
  }
  else {
      company.create(req.body).then(res=>{
        response.send(res);
      }).catch(err=>{
        return response.status(500).json({
            error: err
        })
      })
  }
})

module.exports = router;