const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa2:server')
const views = require('koa-views')
const statics =  require('koa-static')
const path = require('path')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const config = require('./config/default')
const response = require('./middlewares/response')

const staticPath = './static';
app.use(statics(
	path.join(__dirname, staticPath)
))

// 解析请求体,数据处理
app.use(bodyParser())

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs'
}))


// 使用响应处理中间件
app.use(response)

//跨域
app.use(cors());

// 引入路由分发
// 注意require('koa-router')返回的是函数:
const router = require('./routers')
app.use(router.routes())

// 启动程序，监听端口
const port = process.env.PORT || config.port
app.listen(config.port, () => debug(`listening on port ${port}`));
console.log('listening on port' + port)
