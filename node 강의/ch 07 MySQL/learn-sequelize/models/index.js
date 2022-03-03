const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment')


const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

//db에 model을 대입
db.User = User;
db.Comment = Comment;
//model 초기화
User.init(sequelize);
Comment.init(sequelize);
//model관의 관계 정리(foreign key와 같은 것들)
User.associate(db);
Comment.associate(db);

module.exports = db;