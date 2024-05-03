import Payment from '../../models/Payment.js'

export const isPaid = async (chatId) => {
  const payment = await Payment.findOne({ where: { chatId } })
  return payment?.is_payment || false
}
