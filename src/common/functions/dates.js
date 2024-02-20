export const daysBetween = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.floor((endDate - startDate) / oneDay)
}

export const minutesBetween = (startDate, endDate) => {
  const oneMinute = 60 * 1000
  return Math.floor((endDate - startDate) / oneMinute)
}
