const {Model, DataTypes, Sequelize} = require('sequelize')

const HABITACION_TABLE = 'habitaciones';

const HabitacionSchema = {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  comodidades:{
    type: DataTypes.TEXT,
  },
  descripcion:{
    type: DataTypes.TEXT,
  },
  cantCamas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  privada:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  precio:{
    type: DataTypes.INTEGER,
  },
  banoPrivado:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Habitacion extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HABITACION_TABLE,
      modelName: 'Habitacion',
      timestamps: false
    }
  }
}


module.exports = { HABITACION_TABLE, HabitacionSchema, Habitacion }
