const errorType = require("../constants/error-types");
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorType.USER_ALREADY_EXIT:
      status = 409; // 请求冲突 con
      message = "用户名已存在";
      break;
    case errorType.USER_DOES_NOT_EXIT:
      status = 400;
      message = "用户不存在";
      break;
    case errorType.PASSWORD_IS_ERROR:
      status = 400;
      message = "密码错误";
      break;
    case errorType.UNAUTHORIZATION:
      status = 401;
      message = "无效的token~";
      break;
    case errorType.UNPERMISSION:
      status = 401;
      message = "你不具备操作的权限";
      break;
    default:
      status = 404;
      message = "not found";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
