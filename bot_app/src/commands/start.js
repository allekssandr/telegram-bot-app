import Bot from '../bot.js'

import {
  getChatFormDB,
  isAdmin,
  isPaid,
  saveChat,
  sendInvoiceForCourse,
  saveProgress,
  getLastProgress,
  sendLesson,
  saveTimer,
  daysBetween,
  getLesson,
  sendLessonById,
} from '../common/functions/index.js'
import { getTimerAll } from '../common/functions/getTimer.js'

export const DEFAULT_COURSE_ID = 1

export const startDaily = async (type, interval) => {
  const allTimers = await getTimerAll()
  if (allTimers.length < 1) return

  allTimers.forEach(async (timer) => {
    const { chatId, date_timer } = timer
    const currentInterval = daysBetween(new Date(date_timer), new Date(), type)

    if (interval > currentInterval) return

    const lastProgress = await getLastProgress(chatId)
    if (!lastProgress) return

    if (lastProgress.is_final) {
      await timer.destroy()

      return
    }

    const lesson = await getLesson(lastProgress.courseId, lastProgress.number_lesson)
    if (!lesson) return

    if (lesson.is_final) {
      await timer.destroy()

      return
    }

    const lessonNumber = lesson.number + 1

    await sendLessonById(lesson.course_id, lessonNumber, chatId)
    await saveProgress(chatId, lesson.course_id, lessonNumber, lesson.is_final)
    await timer.destroy()
    await saveTimer(chatId)
  })
}

Bot.start(async (ctx) => {
  try {
    if (!ctx || !ctx?.from?.id || !ctx?.chat?.id) return

    const isChatAdmin = await isAdmin(ctx.from.id)
    if (isChatAdmin) {
      await ctx.reply('Привет Админ! Скоро доделаю! :)')
      return
    }

    const { id, username, first_name, last_name } = ctx.chat
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
        // await startTimer(ctx)

        return
      }
    }

    ctx.reply(messageText)
    await sendLesson(lastProgress.courseId, lastProgress.number_lesson, ctx)
  } catch (e) {
    await ctx.reply('Ошибка! Обратитесь, пожалуйста, к администратору')
    console.log('Ошибка команды start!', e)
  }
})
