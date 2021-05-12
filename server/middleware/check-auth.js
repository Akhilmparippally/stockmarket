const jwt = require('jsonwebtoken')
const jwtconfig = require('../config/configurations.json');
module.exports = (req,res,next)=>{
    try {
        const data = jwt.verify(req.headers.authorization,jwtconfig.jwt_token);
        req.userInformations = data;
        next();
    }
    catch(err) {
        return res.status(401).json({
            message: 'Authentication Failed'
        })
    }
  
    
}