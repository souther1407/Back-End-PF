const {Model, DataTypes, Sequelize} = require('sequelize')

const HUESPED_TABLE = 'huesped';

const HuespedSchema = {
  dni: {
    type: DataTypes.STRING,
    /*defaultValue: Sequelize.UUIDV4,*/
    allowNull: false,
    primaryKey: true,
  },
  //TODO:cambiar luego prueba
  tipoDocumento:{
    type: DataTypes.ENUM("DNI","Passport","Driver License"),
    allowNull: false,
  },
  //TODO:cambiar luego prueba
  nacionalidad: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono:{
    type: DataTypes.STRING,
  },
  fechaNacimiento: {
    type:DataTypes.DATEONLY,
    allowNull:true
  },
  genero: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  direccion:{
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
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