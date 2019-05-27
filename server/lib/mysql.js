var mysql = require('mysql');
const { mysql: config } = require('../config/default.js');

var pool  = mysql.createPool({
	host : config.host,
	user : config.user,
	password : config.pass,
	port: config.port,
	database: config.db,
	// charset: config.char,
	// multipleStatements: true
});

let query = ( sql, values ) => {
	return new Promise(( resolve, reject ) => {
		pool.getConnection( (err, connection) => {
			if (err) {
				reject( err )
			} else {
				connection.query(sql, values, ( err, rows) => {
					if ( err ) {
						reject( err )
					} else {
						resolve( rows )
					}
					connection.release()
				})
			}
		})
	})

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }

let users =
	`create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`

let createTable = ( sql ) => {
	return query( sql, [] )
}

// 建表
// createTable(users)


//查询所有
exports.selectAll = () =>{
	let _sql = "select * from users;"
	return query(_sql )
}
//登录
exports.login = (value) => {
	const { name , password } = value;
	let _sql = `select * from users where name=${name} and password=${password}`
	return query( _sql )
}
// 注册用户
exports.insertData = ( value ) => {
	const { name , password , time } = value;
	// let _sql = 'select into users name=? and password=? and time=?;'
	let _sql = `insert into users (name,password,time) values (name , password , time)`
	return query( _sql )
}
// 查找用户
exports.findUserData = ( name ) => {
	let _sql = `select * from users where name="${name}";`
	return query( _sql )
}
// 删除用户
exports.deleteUserData = ( name ) => {
	let _sql = `delete from users where name="${name}";`
	return query( _sql )
}