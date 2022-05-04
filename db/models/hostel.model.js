const { Model, DataTypes, Sequelize } = require('sequelize')

const HOSTEL_TABLE = 'hostel';

const HostelSchema = {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false
    }
  }

class Hostel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: HOSTEL_TABLE,
            modelName: 'Hostel',
            timestamps: false
        }
    }
}


module.exports = { HOSTEL_TABLE, HostelSchema, Hostel }