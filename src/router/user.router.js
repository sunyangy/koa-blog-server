const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const userRouter = new Router({ prefix: "/education/user" });
// 测试
userRouter.post("/", verifyUser, handlePassword, create);

module.exports = userRouter;
