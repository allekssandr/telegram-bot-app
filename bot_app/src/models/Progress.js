import DB from '../db.js'
import { DataTypes, NOW } from 'sequelize'

const Progress = DB.define('progress',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      chatId: { type: DataTypes.INTEGER, allowNull: false },
      courseId: { type: DataTypes.INTEGER, allowNull: false },
      number_lesson: { type: DataTypes.INTEGER, allowNull: false },
      date_add: {
        type: DataTypes.DATE,
        allowNull: false,
        // eslint-disable-next-line new-cap
        defaultValue: NOW(),
      },
    },
    {
      timestamps: true,
      tableName: 'progress',
    },
)

export default Progress
