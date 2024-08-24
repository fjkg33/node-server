const { Model, DataTypes } = require('sequelize');


class LikeSchool extends Model {
  static init(sequelize) {
    return super.init(
    {
      likeschoolid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: DataTypes.INTEGER, allowNull: false },
      schoolprodid: { type: DataTypes.INTEGER, allowNull: false },
    }, 
    
    {
      sequelize,
      tableName: 'likeschools',
      timestamps: false
    })
  };
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userid' });
    this.belongsTo(models.SchoolProduct, { foreignKey: 'schoolprodid' });
  }
};

module.exports = LikeSchool;
