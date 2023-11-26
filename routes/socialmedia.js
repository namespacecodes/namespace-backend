const router = require('./index')
const { connection, db, runQuery } = require('../sqlconn')


router.post('/getSocialMediaProfile', async (req, res) => {
    try {
        const data = await runQuery("getSocialMediaProfileByUserId", { ...req.body })
        return res.send({ "status": "Success", data })
    } catch (error) {
        return res.status(400).send({ "status": "Failed to get Profile" })
    }
})



router.put('/updateSocialMediaProfile', async (req, res) => {
    try {
        const data = await runQuery("updateSocialMediaProfile", { ...req.body })

        return res.send({ "status": "Success" })
    } catch (error) {
        return res.status(400).send({ "status": "Failed to update Profile" })
    }

})


module.exports = router;