import Chat from '../../models/Chat.js'

export const isAdmin = async (chatId) => {
  const chat = await Chat.findOne({ where: { chatId } })
  return chat?.is_admin || false
}
