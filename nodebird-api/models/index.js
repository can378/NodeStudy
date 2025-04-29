const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Domain = require('./domain');

//sequelize로 데이터베이스 연결
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

//db객체에 instance와 모델 추가
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Domain = Domain;

//모델 초기화
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Domain.init(sequelize);


//모델간 관계 설정
User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Domain.associate(db);

module.exports = db;
