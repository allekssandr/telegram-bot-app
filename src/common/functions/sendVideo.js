export const sendVideo = async (videoId, ctx) => {
  const { id } = ctx.chat
  const res = await ctx.telegram.sendVideo(id, videoId, { protect_content: true })
  return res || false
}
