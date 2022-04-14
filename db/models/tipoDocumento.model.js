const {Model, DataTypes, Sequelize} = require('sequelize')

const TIPO_DOCUMENTO_TABLE = 'tipo_documento';

const tipoDocumentoSchema = {
  id: {
    allownull: false,
    primaryKey: true,
    type: DataTypes.UUID,     
    defaultValue: DataTypes.UUIDV4,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

class TipoDocumento extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_DOCUMENTO_TABLE,
      modelName: 'TipoDocumento',
      timestamps: false
    }
  }
}


module.exports = { TIPO_DOCUMENTO_TABLE, tipoDocumentoSchema, TipoDocumento }