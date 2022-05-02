const { Model, DataTypes, Sequelize } = require('sequelize')

const PAGO_TABLE = 'pagos';

const PagoSchema = {
    id: {
        type:DataTypes.STRING,
        primaryKey:true,
    },
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    moneda:{
        type:DataTypes.STRING,

    },
    metodoDePago:{
        type:DataTypes.ENUM("card","cash")
    },
    estado:{
        type:DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Pago extends Model {
    static associate() {
        // asociaciones
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PAGO_TABLE,
            modelName: 'Pago',
            timestamps: false
        }
    }
}


module.exports = { PAGO_TABLE, PagoSchema, Pago }