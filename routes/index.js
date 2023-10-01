var express = require('express');
var router = express.Router();  
const jwt = require('jsonwebtoken');   
const {OAuth2Client} = require('google-auth-library');
const {connection,db}=require('../sqlconn')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERET, (err, user) => {
          if (err) {
            console.log(err.message)
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  }else {
      res.sendStatus(401);
  }
};


async function verify(req) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: req.body.clientId,  
    });
    const payload = ticket.getPayload();
    return payload 
}



//Routes
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/googleLogin', function(req, res) {
  verify(req).then(async(payload)=>{
    const usr= await db.getUserByEmail(payload.email)
    console.log(usr);
    if(!usr){
      await  db.insertUser(payload.name,payload.email,"Google Auth")
    }
    const user= await db.getUserByEmail(payload.email)
    const accessToken = jwt.sign({ userid: user.userid,name:user.name,email:user.name}, process.env.ACCESS_TOKEN_SECERET,{expiresIn:'2h'});
    console.log(accessToken);

    res.status(200).send({"status":"success",accessToken})
    }).catch((err)=>{
       console.log(err)
       res.send({"status":"error"})
    })
});

router.post('/testAuth',authenticateToken,(req,res)=>{
  res.send({"status":"sdfdfc"})

})

// router.post('/logout', (req, res) => {
//   const { email } = req.body;
//   connection.query(`UPDATE users SET refresh_token = null  WHERE email = '${payload.email}';`,(error,res)=>{
//     if (error) {
//       console.error('Error checking user:', error);
//       return;
//     }
//     res.status(200).send({"status":"Logout successful"});
//   })
  
// });




module.exports = router;
