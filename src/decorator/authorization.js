/**
 * 装饰 route 要求提供 jwt
 */
export function Authentication () {
  return (target, key, descriptor) => {
    descriptor.value = async (ctx, next) => {
      if (ctx.request.header.authorization && ctx.state.user) {
        await descriptor.value()
      } else {
        ctx.status = 401
        ctx.body = {
          success: false,
          message: 'Permssion denied'
        }
      }
    }
  }
}
