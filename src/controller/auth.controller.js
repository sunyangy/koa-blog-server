const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    try {
      const { id, username } = ctx.user;
      const token = jwt.sign({ id, username }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24 * 7,
        algorithm: "RS256",
      });
      ctx.success({
        id,
        username,
        token,
      });
      await next();
    } catch (error) {
      console.log("登录失败");
      console.log(error.message);
    }
  }
  async success(ctx, next) {
    ctx.body = "授权成功";
    await next();
  }
}

module.exports = new AuthController();
