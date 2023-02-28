const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const userRouter = new Router();
// 注册
userRouter.post("/user", verifyUser, handlePassword, create);

module.exports = userRouter;
