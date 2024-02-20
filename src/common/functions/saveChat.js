import Chat from '../../models/Chat.js'

export const saveChat = async (chat, isAdmin) => {
  const { id, username, first_name, last_name } = chat
    
  return await Chat.create(
      { chatId: id, username, first_name, last_name, is_admin: isAdmin }, 
      { tableName: 'chat' },
  ) || null
}
