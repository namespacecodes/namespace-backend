const router = require('./index')
const {connection,db,runQuery}=require('../sqlconn')


router.get('/:userRoute',async(req,res)=>{
    const user_route=req.params.userRoute
    try {
        const user_data=await runQuery("getUserByUserRoute",{user_route})
        const service_data=await runQuery("getServicesByUserId",{user_id:user_data.user_id})
        const socialmedia_data=await runQuery("getSocialMediaProfileByUserId",{user_id:user_data.user_id})

        return res.send({"status":"Success",user_data,service_data,socialmedia_data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to get Profile"})

    }
})




  
module.exports = router;