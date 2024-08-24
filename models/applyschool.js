const { Model, DataTypes } = require('sequelize');


class ApplySchool extends Model {
  static init(sequelize) {
    return super.init(
    {
      applyschoolid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userid: { type: DataTypes.INTEGER, allowNull: false },
      schoolprodid: { type: DataTypes.INTEGER, allowNull: false },
      applyDate: { type: DataTypes.DATE, allowNull: false },
    }, 
    {
      sequelize,
      tableName: 'applyschools',
      timestamps: false
    })
  };
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userid' });
    this.belongsTo(models.SchoolProduct, { foreignKey: 'schoolprodid' });
  }
};

module.exports = ApplySchool;
