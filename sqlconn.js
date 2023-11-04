const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'be2z1gncsx570qduimrx-mysql.services.clever-cloud.com', //'127.0.0.1',
    user: 'ugslsed8pcscmxhw',//'root',
    password: 'AdtOT17v8phPRzagMXVM',//process.env.DB_PASSWORD,
    database:'be2z1gncsx570qduimrx' //'namespace',
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database.');
  });
  
  const db={}
  db.getAllUsers = () =>{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM users ', (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users);
        });
    });
};
  db.getUserByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM users WHERE email = ?', [email], (error, users)=>{
            if(error){
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};
db.insertUser = (name,email,type) =>{
  return new Promise((resolve, reject)=>{
    connection.query('INSERT INTO users (name,email,type) VALUES (?,?,?)', [name,email,type], (error, res)=>{
          if(error){
              return reject(error);
          }
          return resolve(res);
      });
  });
};



  module.exports={connection,db};