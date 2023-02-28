const Router = require("koa-router");
const articleRouter = new Router({ prefix: "/article" });
const { verifyAuth } = require("../middleware/auth.middleware");
const {
  createArticle,
  list,
  detail,
} = require("../controller/article.controller");
// 创建文章
articleRouter.post("/", verifyAuth, createArticle);
// 获取文章列表
articleRouter.get("/", list);

// 获取文章详情
articleRouter.get("/:articleId", detail);

module.exports = articleRouter;
