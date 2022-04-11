const {Model, DataTypes, Sequelize} = require('sequelize')

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
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
  telefono:{
    type: DataTypes.INTEGER,
  },
  direccion:{
    type: DataTypes.STRING,
  },
  nombreUser:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
  },
<<<<<<< HEAD
  // tipoUsuario: {
  //   type: DataTypes.ENUM('admin', 'usuario', 'huesped', 'empleado'),
  //   allowNull: false,
  //   field: 'tipo_usuario',
  // },
=======
>>>>>>> 3a247f5df847d84290979aa662cf6f1bb885410d
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
