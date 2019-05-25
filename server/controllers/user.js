const userModel = require('../lib/mysql.js');
const md5 = require('md5');
var moment = require('moment');


//login
exports.login = async (ctx, next) => {
	// test 获取数据库数据
	await userModel.selectAll()
		.then(result => {
			console.log(result)
		});
		ctx.state.data = {
			msg: 'hello cyan'
		};

}

//register
exports.register = async (ctx, next) => {
	const { name , password , time } = ctx.query;

	await userModel.findUserData(name)
		.then(async (result) => {
			if(result.length > 0){
				ctx.body = {
					code: 500,
					data:{
						msg:'用户已存在'
					}
				};
				return;
			}
		})

	await userModel.insertData([name , md5(password) , moment(time).format('YYYY-MM-DD HH:mm:ss')])
		.then(result => {
			ctx.body = {
				code: 200,
				message: '注册成功'
			};
		});


}