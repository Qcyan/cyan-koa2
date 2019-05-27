const jwt = require('jsonwebtoken');
const serect = 'token';  //密钥

//创建token并导出
module.exports = (userinfo) => {
	const token = jwt.sign({
		user: userinfo.name,
		id: userinfo.id
	}, serect, {expiresIn: '1h'});
	return token;
};