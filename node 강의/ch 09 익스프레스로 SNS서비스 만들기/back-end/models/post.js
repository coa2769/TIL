const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content : {
        type : Sequelize.STRING(140),
        allowNull : false,
      },
      img : { //이미지 경로
        type : Sequelize.STRING(200),
        allowNull : true,
      },
    }, {
      sequelize,
      timestamps : true,
      underscored : false,
      modelName : 'Post',
      tableName : 'posts',
      paranoid : false,
      charset : 'utf8mb4',
      collate : 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    //모델 간의 관계 정의
    //1(User):N(Post)관계
    db.Post.belongsTo(db.User);
    //N(Post):M(Hashtag) 관계
    db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'});
  }
}