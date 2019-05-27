// 路由中间件
const Router  = require('koa-router');
const router = new Router({
	prefix: '/api'
})

// const router = require('koa-router')({
// 	prefix: '/api'
// })

const controllers = require('../controllers')

router.get('/demo', controllers.demo);
router.get('/login', controllers.user.login);
router.get('/register', controllers.user.register);

// router.get('/404', async (ctx) => {
// 	let title = "404"
// 	await ctx.render('err', {
// 		title
// 	})
// })


module.exports = router