const {Model, DataTypes, Sequelize} = require('sequelize')

const IMAGENES_TABLE = 'imagenes';

const ImagenesSchema = {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    
  },
  enlace: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:"https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png",
    validate:{
        isUrl:true
    }
  }
}

class Imagenes extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGENES_TABLE,
      modelName: 'Imagenes',
      timestamps: false
    }
  }
}


module.exports = { IMAGENES_TABLE, ImagenesSchema, Imagenes }
