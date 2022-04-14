const {Model, DataTypes, Sequelize} = require('sequelize')

const HISTORIAL_OCUPANTE_TABLE = 'historial_ocupante';

const HistorialOcupanteSchema = {
  
    checkIn:{
        type: DataTypes.DATEONLY,
        allowed: false
    },
    checkOut:{
        type: DataTypes.DATEONLY,
        allowed: false
    }
}

class HistorialOcupante extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HISTORIAL_OCUPANTE_TABLE,
      modelName: 'Historia_Ocupante',
      timestamps: false
    }
  }
}


module.exports = { HISTORIAL_OCUPANTE_TABLE, HistorialOcupanteSchema, HistorialOcupante }
