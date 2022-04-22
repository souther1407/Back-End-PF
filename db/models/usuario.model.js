const {Model, DataTypes, Sequelize} = require('sequelize')

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  dni: {
    type: DataTypes.STRING,
    /*defaultValue: Sequelize.UUIDV4,*/
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
  rol: {
    type: DataTypes.ENUM('administrador', 'recepcionista',
    'cliente'),
    allowNull: false,
  },
  telefono:{
    type: DataTypes.STRING,
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
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  genero: {
    allowNull: false,
    type: DataTypes.ENUM('masculino', 'femenino',
    'otro')
  },
  tokenRecuperacion: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  refreshToken: {
    field: 'refresh_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Usuario extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_TABLE,
      modelName: 'Usuario',
      timestamps: false
    }
  }
}


module.exports = { USUARIO_TABLE, UsuarioSchema, Usuario }
