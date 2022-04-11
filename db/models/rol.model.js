const {Model, DataTypes, Sequelize} = require('sequelize')

const ROL_TABLE = 'roles';

const RolSchema = {
  id: {
    allownull: false,
    primaryKey: true,
    type: DataTypes.UUID,     
    defaultValue: DataTypes.UUIDV4,
  },
  tipo: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Rol extends Model {
  static associate() {
    // asociaciones
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROL_TABLE,
      modelName: 'Roles',
      timestamps: false
    }
  }
}


module.exports = { ROL_TABLE, RolSchema, Rol }