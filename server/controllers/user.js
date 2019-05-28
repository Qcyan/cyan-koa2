const userModel = require('../lib/mysql.js');
const addtoken = require('../token/addtoken.js');
const decodeToken = require('../token/verifyToken.js');
const md5 = require('md5');
const crypto = require('crypto');
var moment = require('moment');


// 对密码加密(nodeJS crypto模块Hmac加密)  有MD5和SHA1，还有跟安全的sha256和sha512，不同的是，Hmac（sha256和sha512）还需要一个密钥：
function encrytoPwd(pwd) {
	//创建Hmac加密方式
	const hmac = crypto.createHmac('sha256', 'secret-key');
	//加密过程
	hmac.update(pwd);
	//输出的最终密文
	return hmac.digest('hex');
}

//selectAll
exports.selectAll = async (ctx,next) =>{
	// let token = ctx.request.header.authorization;
	let token = ctx.request.query.token
	if(token){
		let res = decodeToken(token);
		// console.log(res) //{ user: '12345', id: 33, iat: 1559035521, exp: 1559039121 }

		if (res && res.exp <= new Date()/1000){
			ctx.body = {
				data:{
					msg:'token过期',
				},
				code:3
			};
		} else {
			ctx.body = {
				data:{
					msg:'解析成功',
				},
				code:1
			}
		}
	}else{
		ctx.body = {
			code: 102,
			data:{
				msg:'没有token',
			}
		}
	}
}


//login
exports.login = async (ctx, next) => {
	ctx.request.query.password = encrytoPwd(ctx.request.query.password)

	await userModel.login(ctx.request.query)
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
			}
		});


}

//register
exports.register = async (ctx, next) => {
	let { name } = ctx.request.query;
	ctx.request.query.password = encrytoPwd(ctx.request.query.password)

	console.log(ctx.request.query)

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
	await userModel.insertData(ctx.request.query)
		.then(result => {
			ctx.body = {
				code: 200,
				message: '注册成功'
			};
		});


}