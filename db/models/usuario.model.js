const { allow } = require('joi');
const {Model, DataTypes, Sequelize} = require('sequelize')

const USUARIO_TABLE = 'usuarios';

const UsuarioSchema = {
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
    primaryKey:true,
  },
  //TODO:cambiar luego prueba
  nacionalidad: {
    type: DataTypes.STRING
  },
  googleId:{
    type: DataTypes.STRING,
    allowNull:true
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
    defaultValue: 'cliente'
  },
  telefono:{
    type: DataTypes.STRING,
  },
  fechaNacimiento: {
    type:DataTypes.DATEONLY,
    allowNull:true
  },
  direccion:{
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue: "https://www.pngitem.com/pimgs/m/111-1114675_user-login-person-man-enter-person-login-icon.png",
    validate: {
      isUrl: true
    }
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
  tokenRecuperacion: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  genero:{
    type: DataTypes.ENUM("female","male","other"),
    allowNull: false,
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
