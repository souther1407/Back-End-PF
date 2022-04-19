const {Model, DataTypes, Sequelize} = require('sequelize')

const FECHA_TABLE = 'fechas';

const FechasSchema = {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    
  },
  checkin: {
    type: DataTypes.BIGINT,
  },
  checkout: {
    type: DataTypes.BIGINT,
  },
  rango: {
    type: DataTypes.RANGE(DataTypes.BIGINT),
  }


}

class Fecha extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FECHA_TABLE,
      modelName: 'Fecha',
      timestamps: false
    }
  }
}


module.exports = { FECHA_TABLE, FechasSchema, Fecha }
