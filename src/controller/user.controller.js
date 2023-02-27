const userService = require("../service/user.service");
class UserController {
  async create(ctx, next) {
    try {
      const user = ctx.request.body;
      const result = await userService.create(user);
      ctx.success();
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new UserController();
