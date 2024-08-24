const { Model, DataTypes } = require('sequelize');
class Reservation extends Model {
  static init(sequelize) {
    return super.init({
        reserv_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        used_point: { type: DataTypes.INTEGER, allowNull: true },
        reserv_time: { type: DataTypes.INTEGER, allowNull: false },
        userid: { type: DataTypes.INTEGER, allowNull: false }
    }, {
      sequelize,
      tableName: 'reservations',
      timestamps: false
    });
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userid" });
  }
}
module.exports = Reservation;