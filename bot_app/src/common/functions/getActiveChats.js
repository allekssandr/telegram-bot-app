import Progress from '../../models/Progress.js'

export const getActiveChats = async () => {
  const allActiveChats = await Progress.findAll({
    attributes: ['chatId'],
    distinct: true,
  })
    
  return allActiveChats.length > 0 ? allActiveChats.map((chat) => chat.get('chatId')) : []
}
