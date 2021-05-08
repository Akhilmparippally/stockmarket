const express = require('express');
const path = require('path');
const app = express();

const companies = require('./server/routes/companies');
//const add = require('./server/routes/addstock');


app.use(express.static(path.join(__dirname,'dist')));

app.use('/companies', companies);

//app.use('/addstock', add);

app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'dist/inde.html'))
})
const port = process.env.PORT || 4600

app.listen(port,(req,res)=> {
    console.log('Server running port', port)
})