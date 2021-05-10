const express = require('express');
const path = require('path');
const app = express();


const companies = require('./server/routes/companies');
const add = require('./server/routes/addstock');
//const auth = require('./server/routes/auth');


app.use(express.static(path.join(__dirname,'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/companies', companies);
//app.use('/login',auth);
app.use('/addstock', add);

app.get('*',(req,res)=> {
    console.log(__dirname);
   console.log(path.join(__dirname,'dist/index.html'));
   res.sendFile('index.html', { root: __dirname });
})
const port = process.env.PORT || 4600

app.listen(port,(req,res)=> {
    console.log('Server running port', port)
})