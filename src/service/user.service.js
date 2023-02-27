const connection = require("../app/database");
class UserService {
  // 插入用户
  async create(user) {
    try {
      const { username, password } = user;
      const statement = `INSERT INTO user (name,password) VALUES (?,?);`;
      const result = connection.execute(statement, [username, password]);
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  // 根据用户名查询用户
  async getUserByName(name) {
    try {
      const statement = `SELECT * FROM user WHERE name = ?`;
      const result = await connection.execute(statement, [name]);
      return result[0];
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new UserService();
