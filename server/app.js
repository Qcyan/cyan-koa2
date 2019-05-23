const Koa = require('koa')
const app = new Koa()
const debug = require('debug')
const response = require('./middlewares/response')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const config = require('./config')


// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

//跨域
app.use(cors());

// 引入路由分发
// 注意require('koa-router')返回的是函数:
const router = require('./routers')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
