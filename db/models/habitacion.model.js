const {Model, DataTypes, Sequelize} = require('sequelize')

const HABITACION_TABLE = 'habitaciones';

const HabitacionSchema = {
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
  comodidades:{
    type: DataTypes.STRING,
  },
  cantCamas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipoHabitacion:{
    type: DataTypes.ENUM('compartida', 'privada'),
    allowNull: false,
    field: ' tipo_habitacion',
  },
  precio: {
    type: DataTypes.INTEGER
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
