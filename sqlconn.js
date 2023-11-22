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


db.getSocialMediaProfileByUserId=(userId,socialMediaName)=>{
  if(socialMediaName){
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM socialMediaProfiles WHERE user_id = ? and social_media_name = ?', [userId,socialMediaName], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }else{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM socialMediaProfiles WHERE user_id = ?', [userId], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }
  
}

db.getServicesByUserId=(userId,serviceName)=>{
  if(serviceName){
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM services WHERE user_id = ? and service_name = ?', [userId,serviceName], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }else{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM services WHERE user_id = ?', [userId], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }
  
}

db.getAvailabilityByUserId=(userId,day)=>{
  if(day){
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM availability WHERE user_id = ? and day = ?', [userId,day], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }else{
    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM availability WHERE user_id = ?', [userId], (error, profiles)=>{
            if(error){
                return reject(error);
            }
            return resolve(profiles[0]);
        });
    });
  }
  
}


db.updateSocialMediaProfile = (userId,socialMediaName,profileLink) =>{
  return new Promise(async(resolve, reject)=>{
    const profile= await db.getSocialMediaProfileByUserId(userId,socialMediaName)

    if(profile){
      connection.query('UPDATE socialMediaProfiles SET profile_link = ?  WHERE user_id = ? AND social_media_name = ?;', [profileLink,userId,socialMediaName], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }else{
      connection.query('INSERT INTO socialMediaProfiles (user_id, social_media_name, profile_link) VALUES (? , ? , ? );', [userId,socialMediaName,profileLink], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }
  });
};


db.updateSerive = (userId,serviceName,description,moreInfo,price,duration) =>{
  return new Promise(async(resolve, reject)=>{
    const profile= await db.getServicesByUserId(userId,serviceName)

    if(profile){
      connection.query('UPDATE services SET description = ? ,more_info = ? , price = ?, duration = ?  WHERE user_id = ? AND service_name = ?;', [description,moreInfo,price,duration,userId,serviceName], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }else{
      connection.query('INSERT INTO services (user_id, service_name, description, more_info, duration, price) VALUES (?, ?, ?, ?, ?, ?);',[userId,serviceName,description,moreInfo,duration,price], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }
  });
};

db.updateAvailability = (userId,day,time) =>{
  return new Promise(async(resolve, reject)=>{
    const data= await db.getAvailabilityByUserId(userId,day)

    if(data){
      connection.query('UPDATE availability SET time = ?  WHERE user_id = ? AND day = ?;', [time,userId,day], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }else{
      connection.query('INSERT INTO availability (user_id, day, time) VALUES (?, ?, ?);',[userId,day,time], (error, res)=>{
        if(error){
            return reject(error);
        }
        return resolve(res);
    });
    }
  });
};

  module.exports={connection,db};