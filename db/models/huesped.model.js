const {Model, DataTypes, Sequelize} = require('sequelize')

const HUESPED_TABLE = 'huesped';

const HuespedSchema = {
  id:{
    type:DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
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
  numeroDocumento:{
    type: DataTypes.STRING,
    allowNull:false
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