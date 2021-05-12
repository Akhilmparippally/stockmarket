const Sequelize = require('sequelize');
module.exports= new Sequelize('akhil_test_db', 'beta_gorn', 'beta1jhd74!23ndhdkvjornQ', {
  host: 'db-beta.gornapp.com',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
