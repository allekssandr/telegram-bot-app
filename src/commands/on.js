import Bot from '../bot.js'
import { addPayment, getLastProgress, saveProgress, saveTimer, sendLesson } from '../common/functions/index.js'
import { DEFAULT_COURSE_ID, startTimer } from './start.js'

Bot.on('pre_checkout_query', async (ctx) => {
  try {
    const preCheckoutQuery = ctx.preCheckoutQuery

    await ctx.telegram.answerPreCheckoutQuery(preCheckoutQuery.id, true)
  } catch (e) {
    console.log(e)
  }
})

Bot.on('successful_payment', async (ctx) => {
  const chatId = ctx.chat.id
  // const amount = ctx.update.message.successful_payment.total_amount
  const providerPaymentChargeId = ctx.update.message.successful_payment.provider_payment_charge_id
  if (!providerPaymentChargeId) return

  const res = await addPayment(chatId, DEFAULT_COURSE_ID, providerPaymentChargeId)

  if (!res)
    throw new Error('Ошибка сохранения оплаты!')

  await ctx.reply('Начнём! Посмотри видеоурок, занимайся по раздатке и присылай свое видео с домашним заданием' +
      ' в аккаунт @rustambagizov или прямо сюда в бот.')

  await saveProgress(chatId, DEFAULT_COURSE_ID, 1)
  await sendLesson(DEFAULT_COURSE_ID, 1, ctx)
  await saveProgress(chatId, DEFAULT_COURSE_ID, 2)
  await sendLesson(DEFAULT_COURSE_ID, 2, ctx)

  await saveTimer(chatId)
  await startTimer(ctx)
})

Bot.on('video', async (ctx) => {
  const lastProgress = await getLastProgress(ctx.chat.id)
  if (!lastProgress) return
  await ctx.telegram.sendVideo(336331349, ctx?.message?.video?.file_id)
})
