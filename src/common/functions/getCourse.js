import Course from '../../models/Course.js'

export const getCourse = async (courseId) => {
  const course = await Course.findOne({ where: { id: courseId } })
  return course || null
}
