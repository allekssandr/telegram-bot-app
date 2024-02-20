import DB from '../db.js'
import { DataTypes } from 'sequelize'

const Course = DB.define('course',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      price: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true }, 
      label: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      updatedAt: false,
      tableName: 'course',
    },
)

export default Course
