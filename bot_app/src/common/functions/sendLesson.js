import Bot from '../../bot.js'
import { getLesson, sendDocument, sendVideo } from './index.js'

export const sendLesson = async (courseNumber, lessonNumber, ctx) => {
  const lesson = await getLesson(courseNumber, lessonNumber)

  if (!lesson)
    throw new Error('Лекция не найдена')

  const { name, description, video_id, pdf_id } = lesson
  const messageText = `<b>${name || '---'}</b>\n${description || ''}`
  await ctx.reply(messageText, { parse_mode: 'html' })
  if (pdf_id) await sendDocument(pdf_id, ctx)
  if (video_id) await sendVideo(video_id, ctx)
}

export const sendLessonById = async (courseNumber, lessonNumber, id) => {
  const lesson = await getLesson(courseNumber, lessonNumber)

  if (!lesson)
    throw new Error('Лекция не найдена')

  const { name, description, video_id, pdf_id } = lesson
  const messageText = `<b>${name || '---'}</b>\n${description || ''}`

  await Bot.telegram.sendMessage(id, messageText, { parse_mode: 'html' })
  // TODO: повторная отправка видео и документа, только через Bot а не ctx - переделать
  if (pdf_id) await Bot.telegram.sendDocument(id, pdf_id, { protect_content: true })
  if (video_id) await Bot.telegram.sendVideo(id, video_id, { protect_content: true })
}
