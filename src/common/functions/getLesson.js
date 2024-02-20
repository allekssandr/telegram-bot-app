import Lesson from '../../models/Lesson.js'
import Progress from '../../models/Progress.js'

export const getLesson = async (courseId, numberLesson) => {
  const lesson = await Lesson.findOne({ where: { course_id: courseId, number: numberLesson } })
  return lesson || null
}

export const getLastProgress = async (chatId) => {
  const allProgress = await Progress.findAll()
  if (allProgress?.length < 1) return null

  const lastLesson = await Progress.findOne({ where: { chatId }, order: [['createdAt', 'DESC']] })
  return lastLesson || null
}
