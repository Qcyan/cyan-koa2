module.exports = async (ctx, next) => {
	// 请求相关
	// console.log(ctx.request)

	//参数
	// console.log(ctx.query)


	ctx.state.data = {
		msg: 'hello cyan'
	};


}
