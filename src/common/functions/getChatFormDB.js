import Chat from '../../models/Chat.js'

export const getChatFormDB = async (chatId) => {
  const res = await Chat.findOne({}, { chatId })
  return res || null
}
