import Bot from '../bot.js'
import cron from 'node-cron'

import {
  getChatFormDB,
  isAdmin,
  isPaid,
  saveChat,
  sendInvoiceForCourse,
  sendDailyMessage, saveProgress, getLastProgress, sendLesson, saveTimer,
} from '../common/functions/index.js'

export const DEFAULT_COURSE_ID = 1

export const startTimer = (ctx) => {
  cron.schedule('*/2 * * * *', async () => await sendDailyMessage(ctx, 4))
}

Bot.start(async (ctx) => {
  try {
    if (!ctx || !ctx?.from?.id || !ctx?.chat?.id) return

    const isChatAdmin = await isAdmin(ctx.from.id)
    if (isChatAdmin) {
      await ctx.reply('Привет Админ! Скоро доделаю! :)')
      return
    }

    const { id, username, first_name, last_name } = await ctx.chat
    let messageText = 'Ваш последний урок:'

    const lastProgress = await getLastProgress(id)

    if (!lastProgress) {
      const isChatPaid = await isPaid(id)
      if (!isChatPaid) {
        const currentChat = await getChatFormDB(id)
        if (!currentChat) {
          const name = String(first_name).trim() || '---'
          const lastName = String(last_name).trim() || '---'
          const fullName = (name || lastName) === '---' ? 'Друг' : `${lastName} ${name}`
          messageText = `Привет ${username || fullName}!\nТы в боте, который поможет нам с тобой заниматься твоей речью.\nТебе нужно лишь оплатить курс и сразу начнем заниматься.`
          await saveChat(ctx.chat, false)
        } else {
          messageText = 'Похоже ты еще не оплатил курс 😱😱😱'
        }
        await ctx.reply(messageText)
        await sendInvoiceForCourse(DEFAULT_COURSE_ID, id, ctx) // далее переходим в on.js

        return
      } else {
        await ctx.reply(messageText)
        await sendLesson(DEFAULT_COURSE_ID, 1, ctx)
        await saveProgress(id, DEFAULT_COURSE_ID, 1)
        await saveTimer(id)

        return
      }
    }

    ctx.reply(messageText)
    await sendLesson(lastProgress.courseId, lastProgress.number_lesson, ctx)
    await startTimer(ctx)
  } catch (e) {
    await ctx.reply('Ошибка! Обратитесь, пожалуйста, к администратору')
    console.log('Ошибка команды start!', e)
  }
})
