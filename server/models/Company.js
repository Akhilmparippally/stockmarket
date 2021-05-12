const seq = require('sequelize');
const db = require('../config/database')
const Company= db.define('companies',{
    id: {
        type: seq.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "MarketCap": seq.BIGINT,
    "CurrentMarketPrice": seq.BIGINT,
    "Stock": seq.BIGINT,
    "Dividend": seq.BIGINT,
    "ROCE": seq.BIGINT,
    "ROE": seq.BIGINT,
    "Debt": seq.BIGINT,
    "EPS": seq.BIGINT,
    "Reserves": seq.BIGINT,
    "name": seq.STRING,
    "shortname": seq.STRING,
})

module.exports = Company;