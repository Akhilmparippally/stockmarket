const seq = require('sequelize');
const db = require('../config/database')
const User= db.define('user',{
    id: {
        type: seq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        email: seq.STRING,
        password: seq.STRING
})

module.exports = User;