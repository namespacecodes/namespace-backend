var express = require('express');
var router = express.Router();     
const {OAuth2Client} = require('google-auth-library');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/googleLogin', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  console.log(req.body)
 
  async function verify() {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: req.body.clientId,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log("succ")
     
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }

  
    verify()
    .then(()=>{
      console.log("akhasdfhasdhfaehfjlaa")
      res.send({"status":"success"})
    })
    .catch((err)=>{
       console.log(err)
       res.send({"status":"error"})
    })
});


module.exports = router;
