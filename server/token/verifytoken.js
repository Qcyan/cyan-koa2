const jwt = require('jsonwebtoken');
const serect = 'token';  //密钥

// 验证token
module.exports = () => {
	try{
		let _decoded;
		jwt.verify(token,serect,(err,decoded)=>{
			if(err){

			}else{
				_decoded = decoded
			}

		});
		return _decoded;
	}catch(err){
		console.log(err)
	}

}