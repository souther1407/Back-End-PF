const {Model, DataTypes, Sequelize} = require('sequelize')

const NACIONALIDADES_TABLE = 'nacionalidades';

const nacionalidadesSchema = {
  id: {
    allownull: false,
    primaryKey: true,
    type: DataTypes.UUID,     
    defaultValue: DataTypes.UUIDV4,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
}

class Nacionalidades extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NACIONALIDADES_TABLE,
      modelName: 'Nacionalidades',
      timestamps: false
    }
  }
}


module.exports = { NACIONALIDADES_TABLE, nacionalidadesSchema, Nacionalidades }