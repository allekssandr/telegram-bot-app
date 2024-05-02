import { getCourse } from './getCourse.js'

const TYPE = 'test' // 'live' or 'test'

export const sendInvoiceForCourse = async (courseId, chatId, ctx) => {
  const course = await getCourse(courseId)
  if (!course) 
    throw new Error('Курс не найден!')
  

  const { title, description, label, price } = course
  const providerToken = TYPE === 'live' ? process.env.PROVIDER_TOKEN : process.env.PROVIDER_TOKEN_TEST

  const invoice = {
    title,
    description,
    payload: JSON.stringify({
      unique_id: `${chatId}_${Number(new Date())}`,
      provider_token: providerToken,
    }),
    provider_token: providerToken,
    currency: 'RUB',
    prices: [{ label, amount: price }],
    // provider_data: JSON.stringify({
    //   receipt: {
    //     items: [
    //       {
    //         name: 'Услуга по проведению вебинара "Курс по речи"',
    //         sum: price,
    //         quantity: 1,
    //         tax: 'none',
    //       },
    //     ],
    //   },
    // }), // убрано для тестовой оплаты
  }

  await ctx.telegram.sendInvoice(chatId, invoice)
}
