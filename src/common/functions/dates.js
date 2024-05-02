export const daysBetween = (startDate, endDate, type = 'day') => {
  let deltaDate = 60 * 1000 // type === min
  
  if (type === 'day')
    deltaDate = 24 * 60 * 60 * 1000

  return Math.floor((endDate - startDate) / deltaDate)
}
