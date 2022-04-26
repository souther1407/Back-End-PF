const { Model, DataTypes, Sequelize } = require('sequelize')

const PAGO_TABLE = 'habitaciones';

const PagoSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    monto: {
        type: DataTypes.INTEGER,
        allowNull: false
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
            modelName: 'Pagos',
            timestamps: false
        }
    }
}


module.exports = { PAGO_TABLE, PagoSchema, Pago }