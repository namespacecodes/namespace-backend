var express = require('express');
var router = express.Router();
const { connection, db, runQuery } = require('../sqlconn')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hell');
});

router.get('/getAllUsers', async (req, res) => {
  try {
    const data = await runQuery("getAllUsers", {})
    return res.send({ "status": "Success", data })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ "status": "Failed to get Users" })
  }
})

router.post('/getUserByEmail', async (req, res) => {
  try {
    const data = await runQuery("getUserByEmail", { ...req.body })
    return res.send({ "status": "Success", data })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ "status": "Failed to get User" })
  }
})

router.post('/getUserById', async (req, res) => {
  try {
    const data = await runQuery("getUserById", { ...req.body })
    return res.send({ "status": "Success", data })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ "status": "Failed to get User" })
  }
})

router.post('/insertUser', async (req, res) => {
  try {
    const data = await runQuery("insertUser", { ...req.body })
    return res.send({ "status": "Success", data })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ "status": "Failed to insert User" })
  }
})

router.put('/updateUser', async (req, res) => {
  try {
    const data = await runQuery("updateUser", { ...req.body })
    return res.send({ "status": "Success", data })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ "status": "Failed to update User" })
  }
})


module.exports = router;
