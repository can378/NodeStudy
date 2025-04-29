const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model {//domain 모델 생성
  static init(sequelize) {//Sequelize 모델을 초기화
    return super.init({
      host: {//host domain주소
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      type: {//도메인 유형
        type: Sequelize.ENUM('free', 'premium'),
        allowNull: false,
      },
      clientSecret: {//client API 비밀키.
        type: Sequelize.UUID,
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'Domain',
      tableName: 'domains',
    });
  }

  static associate(db) {
    db.Domain.belongsTo(db.User);
  }
};
