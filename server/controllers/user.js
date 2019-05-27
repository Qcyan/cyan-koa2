const userModel = require('../lib/mysql.js');
const addtoken = require('../token/addtoken.js');
const md5 = require('md5');
var moment = require('moment');


//login
exports.login = async (ctx, next) => {
	await userModel.login(ctx.query)
		.then(res => {
			if(res.length  == 0){
				ctx.body = {
					code: 101,
					data:{
						msg:'账号或密码错误'
					}
				};
			}else{
				let tk = addtoken({name:res[0].name,id:res[0].id})  //token中要携带的信息，自己定义
				ctx.state.data = {
						tk,
						user:res[0].name
				};
				// ctx.body = {
				//  code:200
				// 	data:{
				// 		tk,
				// 		user:res[0].name
				// 	}
				// };
			}
		});


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

	// await userModel.insertData([name , password , time])
	await userModel.insertData(ctx.query)
		.then(result => {
			ctx.body = {
				code: 200,
				message: '注册成功'
			};
		});


}