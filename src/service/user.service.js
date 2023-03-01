const connection = require("../app/database");
const { v4: uuidv4 } = require("uuid");
class UserService {
  // 插入用户
  async create(user) {
    try {
      const { username, password } = user;
      const uid = uuidv4();
      console.log(uid);
      const statement = `INSERT INTO user (id,name,password) VALUES (?,?,?);`;
      const result = connection.execute(statement, [uid, username, password]);
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
