import DB from './db.js'
import Bot from './bot.js'
import cron from 'node-cron'
import { startDaily } from './commands/index.js'


try {
  const isConnectedToDB = DB.authenticate()

  if (isConnectedToDB) {
    DB.sync()
    Bot.launch()
    cron.schedule('*/10 * * * *', async () => await startDaily('min', 5))
  }
} catch (e) {
  console.log('Ошибка подключения к БД', e)
}

// Enable graceful stop
process.once('SIGINT', () => Bot.stop('SIGINT'))
process.once('SIGTERM', () => Bot.stop('SIGTERM'))
