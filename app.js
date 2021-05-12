const express = require('express');
const expresshndlbar = require('express-handlebars');
const path = require('path');
const app = express();

//Database setup
let db=require('./server/config/database');

db.authenticate().then((res)=> {
    console.log('DB Connected')
}).catch((err)=>{
    console.log('Error')
})

app.use(express.static(path.join(__dirname,'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./server/routes/user'))
app.use('/company', require('./server/routes/company'))

app.get('*',(req,res)=> {
   // console.log(__dirname);
   // res.sendFile(path.join(__dirname,'dist/index.html'));
   res.sendFile('/dist/index.html');
})
const port = process.env.PORT || 4600

app.listen(port,(req,res)=> {
    console.log('Server running port', port)
})