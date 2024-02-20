import DB from '../db.js'
import { DataTypes } from 'sequelize'

const Lesson = DB.define('lesson',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      number: { type: DataTypes.INTEGER },
      course_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      video_id: { type: DataTypes.TEXT, allowNull: true },
      pdf_id: { type: DataTypes.TEXT, allowNull: true },
      is_final: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {
      timestamps: false,
      tableName: 'lesson',
    },
)

export default Lesson
