const Koa = require("koa");
const cors = require("koa2-cors");
// 统一处理响应请求
const routerResponse = require("../middleware/handledata.middleware.js");
const errorHandler = require("../app/error-handle.js");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
app.use(cors());
const useRouters = require("../router/index");
console.log(useRouters);
app.use(routerResponse());
app.useRouters = useRouters;
app.use(bodyParser());
app.useRouters();
app.on("error", errorHandler);
module.exports = app;
