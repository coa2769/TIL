const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title : {
        type : Sequelize.STRING(15),
        allowNull : false,
        unique : true,
      },
    },{
      sequelize,
      timestamps : true,
      underscored : false,
      modelName : 'Hashtag',
      tableName : 'hashtags',
      paranoid : false,
      charset : 'utf8mb4',
      collate : 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    //모델 간의 관계 정의
    //N(Hashtag):M(Post)
    db.Hashtag.belongsToMany(db.Post, { through : 'PostHashtag'});
  }
};