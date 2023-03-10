const connection = require("../app/database");
class ArticleService {
  // 插入文章
  async createArticle(userId, title, content) {
    try {
      const statement = `INSERT INTO article (user_id,title ,content) VALUES (?,?,?);`;
      const result = await connection.execute(statement, [
        userId,
        title,
        content,
      ]);
      return result;
    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  }

  // 获取文章列表
  async getArticleList(offset, size) {
    try {
      const statement = `
SELECT
	a.id id,
	a.title title,
	a.content content,
	a.createAt createTime,
	a.updateAt updateTime,
	JSON_OBJECT ('id', u.id, 'name', u. NAME) author
FROM
	article a
LEFT JOIN user u ON a.user_id = u.id
ORDER BY a.updateAt DESC
LIMIT ?,?	`;

      const result = await connection.execute(statement, [offset, size]);
      return result[0];
    } catch (error) {
      console.log(error.message);
    }
  }

  // 获取文章总数
  async getArticleTotal() {
    try {
      const statement = `SELECT COUNT(*) as total from article`;
      const result = await connection.execute(statement);
      return result[0];
    } catch (error) {
      console.log(error.message);
    }
  }

  // 获取文章详情
  async getArticleById(articleId) {
    try {
      const statement = `SELECT
	a.id id,
	a.title title,
	a.content content,
	a.createAt createTime,
	a.updateAt updateTime,
	JSON_OBJECT ('id', u.id, 'name', u. NAME) author
FROM
	article a
LEFT JOIN user u ON a.user_id = u.id
WHERE
	a.id = ?`;
      const result = await connection.execute(statement, [articleId]);
      return result[0];
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new ArticleService();
