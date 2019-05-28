const jwt = require('jsonwebtoken');
const serect = 'token';  //密钥

// 验证token
module.exports = (tokens,name) => {
	try{
		let _decoded;
		jwt.verify(tokens,serect,(err,decoded)=>{
			if(err){
				console.log(err)
			}else{
				// console.log(decoded)
				_decoded = decoded
			}

		});
		return _decoded;
	}catch(err){
		console.log(err)
	}
}

// module.exports = (tokens) => {
// 	if (tokens){
// 		let toke = tokens.split(' ')[1];
// 		// 解析
// 		let decoded = jwt.decode(toke, serect);
// 		return decoded;
// 	}
// };