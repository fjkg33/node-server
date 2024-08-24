const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static init(sequelize) {
    return super.init(
      {
        orderid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userid: { type: DataTypes.INTEGER, allowNull: false },
        prodid: { type: DataTypes.INTEGER, allowNull: false },
        orderdate: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
        tableName: "orders",
        timestamps: false,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userid" });
    this.belongsTo(models.Product, { foreignKey: "prodid" });
  }
}
module.exports = Order;