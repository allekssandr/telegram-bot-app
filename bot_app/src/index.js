import DB from './db.js'
import Bot from './bot.js'
import cron from 'node-cron'
import { startDaily } from './commands/index.js'

// cron
// '*/10 * * * *' - каждые 10 мин (1.10, 1.20, 1.30...)
// '* '


try {
  const isConnectedToDB = DB.authenticate()

  if (isConnectedToDB) {
    DB.sync()
    Bot.launch()
    cron.schedule('0 10 */1 * *', async () => await startDaily('day', 3))
  }
} catch (e) {
  console.log('Ошибка подключения к БД', e)
}

// Enable graceful stop
process.once('SIGINT', () => Bot.stop('SIGINT'))
process.once('SIGTERM', () => Bot.stop('SIGTERM'))
