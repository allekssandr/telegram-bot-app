import { getTimerAll } from './getTimer.js'
import { daysBetween } from './dates.js'
import { getLastProgress, getLesson } from './getLesson.js'
import { sendLesson } from './sendLesson.js'
import { saveProgress } from './saveProgress.js'
import { saveTimer } from './saveTimer.js'

export const sendDailyMessage = async (ctx, num = 0, type = 'day') => {
  const res = await getTimerAll()
  if (!res.length || !num) return
  
  res.forEach(async (timer) => {
    const { chatId, date_timer } = timer
    const betweenDay = daysBetween(new Date(date_timer), new Date())
    if (num > (type === 'day' ? betweenDay : 0)) return
    
    const lastProgress = await getLastProgress(chatId)
    if (!lastProgress) return
    
    if (lastProgress.is_final) {
      await timer.destroy()
      
      return
    }
    
    const lesson = await getLesson(lastProgress.courseId, lastProgress.number_lesson)
    if (!lesson) return

    if (lesson.is_final) {
      await timer.destroy()

      return
    }

    const lessonNumber = lesson.number + 1
    
    await sendLesson(lesson.course_id, lessonNumber, ctx)
    await saveProgress(chatId, lesson.course_id, lessonNumber, lesson.is_final)
    await timer.destroy()
    await saveTimer(chatId)
  })
}
