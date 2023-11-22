const router = require('./index')
const {connection,db}=require('../sqlconn')

router.put('/updateSocialMediaProfile',async(req,res)=>{
    try {
        var data=await db.updateSocialMediaProfile(req.body.userId,req.body.socialMediaName,req.body.profileLink)
        return res.send({"status":"Success"})
    } catch (error) {
        return res.status(400).send({"status":"Failed to update Profile"})
    }

})