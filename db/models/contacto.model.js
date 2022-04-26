const {Model, DataTypes, Sequelize} = require('sequelize')

const CONTACTO_TABLE = 'contacto';

const ContactoSchema = {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
   }
  }


class Contacto extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACTO_TABLE,
      modelName: 'Contacto',
      timestamps: false
    }
  }
}


module.exports = { CONTACTO_TABLE, ContactoSchema, Contacto }
