const {Model, DataTypes, Sequelize} = require('sequelize')

const HUESPED_TABLE = 'huesped';

const HuespedSchema = {
  dni:{
    type:DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion:{
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.INTEGER
  },
  genero: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  }
}

class Huesped extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HUESPED_TABLE,
      modelName: 'Huesped',
      timestamps: false
    }
  }
}


module.exports = { HUESPED_TABLE, HuespedSchema, Huesped }