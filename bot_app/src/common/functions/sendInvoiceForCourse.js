import { getCourse } from './getCourse.js'

const TYPE = 'live' // 'live' or 'test'
// цена курса задается в бд в коп., 100 = 1р

export const sendInvoiceForCourse = async (courseId, chatId, ctx) => {
  const course = await getCourse(courseId)
  if (!course) 
    throw new Error('Курс не найден!')
  

  const { title, description, label, price } = course
  const providerToken = TYPE === 'live' ? process.env.PROVIDER_TOKEN : process.env.PROVIDER_TOKEN_TEST
  const priceAmount = TYPE === 'live' ? price : 5000

  const invoice = {
    title,
    description,
    payload: JSON.stringify({
      unique_id: `${chatId}_${Number(new Date())}`,
      provider_token: providerToken,
    }),
    provider_token: providerToken,
    currency: 'RUB',
    prices: [{ label, amount: priceAmount }],
    provider_data: JSON.stringify({
      receipt: {
        items: [
          {
            name: 'Услуга по проведению вебинара "Курс по речи"',
            sum: price,
            quantity: 1,
            tax: 'none',
          },
        ],
      },
    }), // убрать для тестовой оплаты
  }

  await ctx.telegram.sendInvoice(chatId, invoice)
}
