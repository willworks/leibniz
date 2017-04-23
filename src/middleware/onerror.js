export default function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      if (e.status === 500 || e.status === undefined) console.error(e)
      ctx.status = e.status || 500
      ctx.body = {
        success: false,
        message: e.message
      }
    }
  }
}
