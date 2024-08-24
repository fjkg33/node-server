const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    return super.init(
      {
        prodid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        prodname: { type: DataTypes.STRING(40), allowNull: false },
        funding: { type: DataTypes.STRING(40), allowNull: false },
        prodCompany: { type: DataTypes.STRING(40), allowNull: false },
        prodprice: { type: DataTypes.INTEGER, allowNull: false },
        personnel: { type: DataTypes.INTEGER, allowNull: false },
        fundingperiod: { type: DataTypes.STRING(40), allowNull: false },
        prodImageURL: { type: DataTypes.STRING(250), allowNull: false },
        detailimgURL: { type: DataTypes.STRING(250), allowNull: false },
        detailimgURL2: { type: DataTypes.STRING(250), allowNull: false },
        detailimgURL3: { type: DataTypes.STRING(250), allowNull: false },
        detailimgURL4: { type: DataTypes.STRING(250), allowNull: false },
        detailimgURL5: { type: DataTypes.STRING(250), allowNull: false },
        prodInfo: { type: DataTypes.STRING(200), allowNull: false },
        moneyState: { type: DataTypes.INTEGER, allowNull: false },
        startdate: { type: DataTypes.STRING(40), allowNull: false },
        enddate: { type: DataTypes.STRING(40), allowNull: false },
      },
      { sequelize, tableName: "products", timestamps: false }
    );
  }
}
module.exports = Product;