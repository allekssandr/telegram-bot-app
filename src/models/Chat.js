import DB from '../db.js'
import { DataTypes } from 'sequelize'

const Chat = DB.define('chat',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
      chatId: { type: DataTypes.INTEGER, unique: true },
      username: { type: DataTypes.STRING, allowNull: true },
      first_name: { type: DataTypes.STRING, allowNull: true },
      last_name: { type: DataTypes.STRING, allowNull: true },
      is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      timestamps: true,
      tableName: 'chat',
    },
)

export default Chat
