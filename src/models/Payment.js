import DB from '../db.js'
import { DataTypes } from 'sequelize'

const Payment = DB.define('payment',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      chatId: { type: DataTypes.INTEGER, unique: true },
      courseId: { type: DataTypes.INTEGER, unique: true },
      is_payment: { type: DataTypes.STRING, allowNull: true },
      provider_payment_charge_id: { type: DataTypes.TEXT, unique: true },
      
    },
    {
      timestamps: true,
      tableName: 'payment',
    },
)

export default Payment
