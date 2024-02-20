import DB from './db.js'
import Bot from './bot.js'
import './commands/index.js'


try {
  const isConnectedToDB = DB.authenticate()

  if (isConnectedToDB) {
    DB.sync()
    Bot.launch()
  }
} catch (e) {
  console.log('Ошибка подключения к БД', e)
}

// try {
// } catch (e) {
//   console.log('Ошибка подключения к БД', e);
// }
//
//
// Bot.help((ctx) => ctx.reply('Send me a sticker'));
//
// Bot.on(message('sticker'), async (ctx) => {
//   const user = await User.findOne(ctx.id);
//   await ctx.reply(user.message || 'no good');
// });
//
// Bot.hears('hi', async (ctx) => {
//   try {
//     await UserModel.create({chatId: ctx.message.chat.id, message: 'good'});
//     await ctx.reply('Hey there');
//   } catch (e) {
//     ctx.reply('О-оу, кажется произошла ошибка :)');
//   }
// });


// Enable graceful stop
process.once('SIGINT', () => Bot.stop('SIGINT'))
process.once('SIGTERM', () => Bot.stop('SIGTERM'))
