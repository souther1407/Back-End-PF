const {Model, DataTypes, Sequelize} = require('sequelize')

const IMAGEN_TABLE = 'imagenes';

const ImagenesSchema = {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png",
    validate:{
        isUrl:true
    }
  }
}

class Imagen extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGEN_TABLE,
      modelName: 'Imagen',
      timestamps: false
    }
  }
}


module.exports = { IMAGEN_TABLE, ImagenesSchema, Imagen }
