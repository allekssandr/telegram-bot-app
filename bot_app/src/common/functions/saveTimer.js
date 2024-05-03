import Timer from '../../models/Timer.js'

export const saveTimer = async (chatId) => {
  const { count } = await Timer.findAndCountAll({ where: { chatId } })
  if (count) return null

  const res = await Timer.create({ chatId, date_timer: new Date() }, { tableName: 'timer' })
  
  return res || null
}
