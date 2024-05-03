import Progress from '../../models/Progress.js'

export const saveProgress = async (chatId, courseId, numberLesson, isFinal = false) => {
  const res = await Progress.create(
      { chatId, courseId, number_lesson: numberLesson, is_final: isFinal },
      { tableName: 'progress' },
  )
  return res || false
}
