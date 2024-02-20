import { getCourse } from './getCourse.js'

export const sendInvoiceForCourse = async (courseId, chatId, ctx) => {
  const course = await getCourse(courseId)
  if (!course) 
    throw new Error('Курс не найден!')
  

  const { title, description, label, price } = course

  const invoice = {
    title,
    description,
    payload: JSON.stringify({
      unique_id: `${chatId}_${Number(new Date())}`,
      provider_token: String(process.env.PROVIDER_TOKEN),
    }),
    provider_token: String(process.env.PROVIDER_TOKEN),
    currency: 'RUB',
    prices: JSON.stringify([{ label, amount: price }]),
    provider_data: JSON.stringify({
      receipt: {
        items: [
          {
            name: 'Услуга по проведению вебинара "Курс по речи"',
            sum: price / 100,
            quantity: 1,
            tax: 'none',
          },
        ],
      },
    }),
  }

  ctx.telegram.sendInvoice(chatId, invoice)
}
