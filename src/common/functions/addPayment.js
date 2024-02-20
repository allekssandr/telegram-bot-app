import Payment from '../../models/Payment.js'

export const addPayment = async (chatId, courseId, providerPaymentChargeId) => {
  return await Payment.create({
    chatId,
    courseId,
    is_payment: true,
    provider_payment_charge_id: providerPaymentChargeId,
  }, { tableName: 'payment' }) || null
}
