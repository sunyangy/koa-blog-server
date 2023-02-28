const Router = require("koa-router");
const authRouter = new Router({ prefix: "/user" });
const { login, success } = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
// 用户登录
authRouter.post("/login", verifyLogin, login);
authRouter.get("/test", verifyAuth, success);

module.exports = authRouter;
