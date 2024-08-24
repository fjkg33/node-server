const { Model, DataTypes } = require('sequelize');


class SchoolProduct extends Model {
  static init(sequelize) {
    return super.init(
    {
      schoolprodid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      schoolname:{ type: DataTypes.STRING(50), allowNull: false },
      writer: { type: DataTypes.STRING(10), allowNull: false },
      schoolPrice: { type: DataTypes.INTEGER, allowNull: false },
      schoolImageURL: { type: DataTypes.STRING(200), allowNull: false },
      schoolSub1ImageURL: { type: DataTypes.STRING(200), allowNull: false },
      schoolSub2ImageURL: { type: DataTypes.STRING(200), allowNull: false },
      schoolSub3ImageURL: { type: DataTypes.STRING(200), allowNull: false },
      schoolInfo: { type: DataTypes.STRING(4000), allowNull: false },
      personnelStatus: { type: DataTypes.INTEGER, allowNull: false },
      personnelMinStatus: { type: DataTypes.INTEGER, allowNull: false },
      personnelMaxStatus: { type: DataTypes.INTEGER, allowNull: false },
      moneyState: { type: DataTypes.INTEGER, allowNull: false },
      startDate: { type: DataTypes.DATE, allowNull: false },
      endDate: { type: DataTypes.DATE, allowNull: false },
    }, {
      sequelize,
      tableName: 'schoolProducts',
      timestamps: false
    })
  };

};

module.exports = SchoolProduct;