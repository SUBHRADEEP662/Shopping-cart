var mysql = require('mysql')
var MsqConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoping_cart',
  multipleStatements: true
});

MsqConn.connect((err) => {
  if(!err){
    console.log('Connected to MySQL Sucessfully.')
  }
  else{
    console.log('MySQL not connected!',err)
  }
});

module.exports = MsqConn;