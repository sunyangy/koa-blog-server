const { PUBLIC_KEY } = require("../app/config");
const errorType = require("../constants/error-types");
const userService = require("../service/user.service");
const md5Password = require("../utils/password-handle");
const jwt = require("jsonwebtoken");
// 验证登录账号密码是否正确合法的中间件
const verifyLogin = async (ctx, next) => {
  try {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
      return ctx.app.emit("error", error, ctx);
    }

    console.log(1);
    const result = await userService.getUserByName(username);
    const user = result[0];
    if (!user) {
      const error = new Error(errorType.USER_DOES_NOT_EXIT);
      return ctx.app.emit("error", error, ctx);
    }

    if (md5Password(password) !== user.password) {
      const error = new Error(errorType.PASSWORD_IS_ERROR);
      return ctx.app.emit("error", error, ctx);
    }
    user.username = user.name;
    delete user.name;
    ctx.user = user;
    await next();
  } catch (error) {
    console.log(error.message);
  }
};

// 验证登录权限的中间件
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // console.log(token);

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log(err.message);
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
