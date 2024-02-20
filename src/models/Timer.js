import DB from '../db.js'
import { DataTypes } from 'sequelize'

const Timer = DB.define('timer',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      chatId: { type: DataTypes.INTEGER, unique: true },
      date_timer: { type: DataTypes.DATE, allowNull: false },
    },
    {
      timestamps: true,
      tableName: 'timer',
    },
)

export default Timer
