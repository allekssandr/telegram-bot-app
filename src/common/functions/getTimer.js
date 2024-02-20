import Timer from '../../models/Timer.js'

export const getTimerFromDB = async (chatId) => {
  const timer = await Timer.findOne({ where: { chatId } })

  return timer || null
}

export const getTimerAll = async () => {
  const timer = await Timer.findAll()

  return timer || []
}
