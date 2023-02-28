const articleService = require("../service/article.service");
class ArticleController {
  async createArticle(ctx, next) {
    const userId = ctx.user.id;
    const { title, content } = ctx.request.body;
    const result = await articleService.createArticle(userId, title, content);
    console.log(result);
    ctx.success({});
  }

  async list(ctx, next) {
    const { page, size } = ctx.request.query;
    const result = await articleService.getArticleList(page, size);
    ctx.success({
      result,
    });
  }

  async detail(ctx, next) {
    const { articleId } = ctx.params;
    const result = await articleService.getArticleById(articleId);
    ctx.success({
      article: result[0],
    });
  }
}

module.exports = new ArticleController();
