const userModel = require('../lib/mysql.js')
module.exports = async (ctx, next) => {
	// 请求相关
	// console.log(ctx.request)

	//参数
	// console.log(ctx.query)

	// test 获取数据库数据
	await userModel.selectAll()
		.then(result => {
			console.log(result)
		})

		ctx.state.data = {
			msg: 'hello cyan'
		};

}
