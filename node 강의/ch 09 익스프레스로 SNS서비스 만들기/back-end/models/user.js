const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      //테이블 칼럼
      email: {
        type : Sequelize.STRING(40),
        allowNull : true,
        unique : true,
      },
      nick: {
        type : Sequelize.STRING(15),
        allowNull : false,
      },
      password: {
        type : Sequelize.STRING(100),
        allowNull : true,
      },
      //로컬 로그인 여부(로컬-local, 카카오-kakao)
      provider: {
        type : Sequelize.STRING(10),
        allowNull : false,
        defaultValue : 'local'
      },
      //
      snsId : {
        type : Sequelize.STRING(30),
        allowNull : true,
      },
    },{
      sequelize,
      //테이블 옵션
      //각 뜻은?
      timestamps : true,
      underscored : false,
      modelName : 'User',
      tableName : 'users',
      paranoid : true,
      charset : 'utf8',
      collate : 'utf8_general_ci',
    });
  }

  static associate(db){
    //모델 간의 관계 정의
    //1(User):N(Post)관계
    db.User.hasMany(db.Post);
    //N:M 관계 (팔로잉 기능)
    db.User.belongsToMany(db.User, {
      //관계를 나타내는 테이블 칼럼이름
      foreignKey : 'followerId',
      //어느 테이블과의 관계를 나타내는가?
      as : 'Followers',
      //관계를 나타내는 테이블의 이름 지정
      through : 'Follow', 
    });
    db.User.belongsToMany(db.User,{
      //관계를 나타내는 테이블 칼럼이름
      foreignKey : 'followerId',
      //어느 테이블과의 관계를 나타내는가?
      as : 'Followings',
      //관계를 나타내는 테이블의 이름 지정
      through : 'Follow',
    });
  }
}