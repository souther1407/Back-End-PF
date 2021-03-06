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
    type: DataTypes.DATEONLY,
    allowNull: false,
    get() {
      return new Date(this.getDataValue('fecha_ingreso'));
    },
    // set(fecha_ingreso){
    //   this.setDataValue('fecha_ingreso', fecha_ingreso.toISOString().splice('T')[0]);
    // }
  },
  estado:{
    type: DataTypes.ENUM('Booked','Occupied', 'For Manteinance', 'closed'),
    allowNull: false,
    defaultValue: 'Booked'
  },
  cancelada:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false,
  },
  fecha_egreso:{
    type: DataTypes.DATEONLY,
    allowNull: false,
    get() {
      return new Date(this.getDataValue('fecha_egreso'));
    },
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false
  }, 
  estado:{
    type: DataTypes.ENUM('Booked','Occupied', 'For Manteinance', 'Closed'),
    allowNull: false,
    defaultValue: 'Booked'
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