const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    return super.init({
      userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      userRealname: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: true },
      zip: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      profileImageLink: { type: DataTypes.STRING, allowNull: true },
      age: { type: DataTypes.INTEGER, allowNull: true },
      gender: { type: DataTypes.STRING, allowNull: true },
      pointStatus: { type: DataTypes.INTEGER, allowNull: true }

    }, {
      sequelize,
      tableName: 'users',
      timestamps: false
    });
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

module.exports = User;
