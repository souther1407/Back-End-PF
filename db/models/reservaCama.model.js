const {Model, DataTypes, Sequelize} = require('sequelize')

const RESERVACAMA_TABLE = 'reservas';

const ReservaCamaSchema = {
  id: {
    type: DataTypes.UUID,     
    defaultValue: DataTypes.UUIDV4,
    allownull: false,
    primaryKey: true,
  },
  fecha_ingreso:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_egreso:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}

class ReservaCama extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RESERVACAMA_TABLE,
      modelName: 'Reserva',
      timestamps: false
    }
  }
}


module.exports = { RESERVACAMA_TABLE, ReservaCamaSchema, ReservaCama }