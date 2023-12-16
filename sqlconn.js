const mysql = require('mysql2');

// Create a connection to the MySQL database
// const connection = mysql.createConnection({
//     host: 'be2z1gncsx570qduimrx-mysql.services.clever-cloud.com', //'127.0.0.1',
//     user: 'ugslsed8pcscmxhw',//'root',
//     password: 'AdtOT17v8phPRzagMXVM',//process.env.DB_PASSWORD,
//     database:'be2z1gncsx570qduimrx' //'namespace',
//   });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });


const pool = mysql.createPool({
  host: 'be2z1gncsx570qduimrx-mysql.services.clever-cloud.com', //'127.0.0.1',
  user: 'ugslsed8pcscmxhw',//'root',
  password: 'AdtOT17v8phPRzagMXVM',//process.env.DB_PASSWORD,
  database: 'be2z1gncsx570qduimrx', //'namespace',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const db = {}

db.createConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}




////users

db.getAllUsers = (connection) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user_id,name,email,bio,more_info,user_route FROM users ', (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users);
    });
  });
};

db.getUserByEmail = (connection, reqBody) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user_id,name,email,bio,more_info,user_route FROM users WHERE email = ?', [reqBody.email], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};

db.getUserByUserRoute = (connection, reqBody) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user_id,name,email,bio,more_info,user_route FROM users WHERE user_route = ?', [reqBody.user_route], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};

db.getUserById = (connection, reqBody) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user_id,name,email,bio,more_info,user_route FROM users WHERE user_id = ?', [reqBody.user_id], (error, users) => {
      if (error) {
        return reject(error);
      }
      return resolve(users[0]);
    });
  });
};

db.insertUser = (connection, reqBody) => {
  return new Promise((resolve, reject) => {
    const queryValues = []
    const keys = Object.keys(reqBody).filter(col => {
      if (["name", "email", "type", "bio", "more_info"].includes(col)) {
        queryValues.push(reqBody[col])
        return true
      }
      return false
    })
    const query = `INSERT INTO users (${keys.join(', ')}) VALUES (${keys.map(column => `?`).join(', ')});`
    console.log(query);
    console.log(queryValues);

    connection.query(query, queryValues, (error, res) => {
      if (error) {
        return reject(error);
      }
      return resolve(res);
    });
  });
};

db.updateUser = (connection, reqBody) => {
  return new Promise((resolve, reject) => {

    const queryValues = []
    const keys = Object.keys(reqBody).filter(col => {
      if (["name", "bio", "more_info"].includes(col)) {
        queryValues.push(reqBody[col])
        return true
      }
      return false
    })
    queryValues.push(reqBody.user_id)
    const query = `UPDATE users SET ${keys.map(column => `${column} = ?`).join(', ')} WHERE user_id = ? ;`

    connection.query(query, queryValues, (error, res) => {
      if (error) {
        return reject(error);
      }
      return resolve(res);
    });
  });
};

//// end Users


//// SocialMediaProfile

db.getSocialMediaProfileByUserId = (connection, reqBody) => {
  if (reqBody.social_media_name) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM socialMediaProfiles WHERE user_id = ? and social_media_name = ?', Object.values(reqBody), (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles[0]);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM socialMediaProfiles WHERE user_id = ?', Object.values(reqBody), (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles);
      });
    });
  }

}

db.updateSocialMediaProfile = (connection, reqBody) => {
  return new Promise(async (resolve, reject) => {
    if (reqBody.profile_id) {
      connection.query('UPDATE socialMediaProfiles SET profile_link = ?  WHERE profile_id = ? ', [reqBody.profile_link, reqBody.profile_id], (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    } else {
      connection.query('INSERT INTO socialMediaProfiles (user_id, social_media_name, profile_link) VALUES (? , ? , ? );', [reqBody.user_id, reqBody.social_media_name, reqBody.profile_link], (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    }
  });
};
////end  SocialMediaProfile

//// Service

db.getServicesByUserId = (connection, reqBody) => {
  if (reqBody.service_name) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM services WHERE user_id = ? and service_name = ?', [reqBody.user_id, reqBody.service_name], (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles[0]);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM services WHERE user_id = ?', [reqBody.user_id], (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles);
      });
    });
  }

}

db.updateSerivce = (connection, reqBody) => {
  return new Promise(async (resolve, reject) => {

    if (reqBody.service_id) {
      const queryValues = []
      const keys = Object.keys(reqBody).filter(col => {
        if (["description", "more_info", "price", "duration", "service_name"].includes(col)) {
          queryValues.push(reqBody[col])
          return true
        }
        return false
      })
      queryValues.push(reqBody.service_id)
      const query = `UPDATE services SET ${keys.map(column => `${column} = ?`).join(', ')} WHERE service_id = ? ;`

      connection.query(query, queryValues, (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    } else {
      connection.query('INSERT INTO services (user_id, service_name, description, more_info, duration, price) VALUES (?, ?, ?, ?, ?, ?);', [reqBody.user_id, reqBody.service_name, reqBody.description, reqBody.more_info, reqBody.duration, reqBody.price], (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    }
  });
};



db.getAvailabilityByUserId = (connection, reqBody) => {
  if (reqBody.day) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM availability WHERE user_id = ? and day = ?', [reqBody.user_id, reqBody.day], (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles[0]);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM availability WHERE user_id = ?', [reqBody.user_id], (error, profiles) => {
        if (error) {
          return reject(error);
        }
        return resolve(profiles);
      });
    });
  }

}

db.updateAvailability = (connection, reqBody) => {
  return new Promise(async (resolve, reject) => {

    if (reqBody.availability_id) {
      connection.query('UPDATE availability SET time = ?  WHERE availability_id = ? ;', [reqBody.time, reqBody.availability_id], (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    } else {
      connection.query('INSERT INTO availability (user_id, day, time) VALUES (?, ?, ?);', [reqBody.user_id, reqBody.day, reqBody.time], (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    }
  });
};



////end services

db.runQuery = async (operationFunction, reqBody) => {
  const connection = await db.createConnection();
  try {
    const result = await db[operationFunction](connection, reqBody);
    return result;
  } finally {
    connection.release();
  }
};


module.exports = { pool, db, runQuery: db.runQuery };