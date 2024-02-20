export const sendDocument = async (documentId, ctx) => {
  const { id } = ctx.chat
  const res = await ctx.telegram.sendDocument(id, documentId, { protect_content: true })
  return res || false
}
