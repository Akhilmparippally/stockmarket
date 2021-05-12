const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let user = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/configurations.json');
/**
   * @author: Akhil M
   * @param: object with email & password
   * @description: Check if user with same email exist.
   */

router.post('/signup',(req,response)=>{  
    user.findAll({
        attributes: ['id','email'],
        where: {
          email: req.body.email
        }
      }).then(res=>{
          console.log('res',res)
        if(res.length>0) {
            response.status(201).json({
                message: "User Already exist"
            })
        }
        else {
            return createUserNow(req,response);
        }
      }).catch(err=>{

      })
   
})
/**
 * @author: Akhil 
 * @description: create a user when no users found with same email id.
 * @param {*} req 
 * @param {*} response 
 */
function createUserNow(req,response){
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) {
            return response.status(500).json({
                error: err
            })
        }
        else {
            user.create({
                email: req.body.email,
                token:'token',
                password: hash
              }).then((res)=>{
                response.status(201).json({
                    message: "User created"
                })
              }).catch((err)=>{
                response.status(500).json({
                    error:err
                })
              })
        }
    })
}
/**
 * @author: Akhil M
 * @description: User login
 */
router.post('/signin',(req,response)=>{
user.findAll({
    attributes: ['id','email','password'],
    where:{email: req.body.email}
}).then(userlist=>{
    if(userlist.length <1) {
        response.status(401).json({
            message: "Login failed..!!"
        }) 
    }
    else {
       
        bcrypt.compare(req.body.password, userlist[0].password,(err,res)=>{
            if(err) {
                response.status(401).json({
                    message: "Login failed..!!"
                })  
            }
            else if(res){
                const token = jwt.sign({
                    email: userlist[0].email,
                    userId: userlist[0].id,

                },jwtconfig.jwt_token, {
                    expiresIn: "1h"
                })
                response.status(200).json({
                    message: "Login Success..!!",
                    token: token
                })
            }
            else {
                response.status(401).json({
                    message: "Login failed..!!"
                })
            }
        })
    }
}).catch(err=>{
    response.status(500).json({
        error:err
    })
})
})  
module.exports = router;