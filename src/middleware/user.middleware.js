const errorType = require("../constants/error-types.js");
const userService = require("../service/user.service.js");
const md5Password = require("../utils/password-handle.js");
// 验证注册用户名和密码的中间件
const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await userService.getUserByName(username);

  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXIT);
    return ctx.app.emit("error", error, ctx);
  }
  console.log("---");
  await next();
};

// 加密密码中间价
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
