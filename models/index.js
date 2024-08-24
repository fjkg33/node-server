const { Sequelize } = require('sequelize');

const User = require('./user');

const Product = require('./product');
const Order = require('./order');
const LikeProduct = require('./likeproduct');

const SchoolProduct = require('./schoolproduct');
const LikeSchool = require('./likeschool');
const ApplySchool = require('./applyschool');

const Reservation = require('./reservation');


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);


const db = {
  sequelize,
  
  User: User.init(sequelize),

  Product: Product.init(sequelize),
  Order: Order.init(sequelize),
  LikeProduct: LikeProduct.init(sequelize),

  SchoolProduct: SchoolProduct.init(sequelize),
  
  LikeSchool: LikeSchool.init(sequelize),
  ApplySchool: ApplySchool.init(sequelize),

  Reservation: Reservation.init(sequelize),
};


// LikeSchool.associate({ User, SchoolProduct });
// ApplySchool.associate({ User, SchoolProduct });
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

sequelize.sync();

module.exports = db;
