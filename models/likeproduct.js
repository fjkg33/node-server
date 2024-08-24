const { Model, DataTypes } = require('sequelize');

class LikeProduct extends Model {
  static init(sequelize) {
    return super.init({
      likeProdid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: DataTypes.INTEGER, allowNull: false },
      prodid: { type: DataTypes.INTEGER, allowNull: false },
    }, {
      sequelize,
      tableName: 'likeprods',
      timestamps: false
    });
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userid' });
    this.belongsTo(models.Product, { foreignKey: 'prodid' });
  }
}

module.exports = LikeProduct;