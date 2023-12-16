const router = require('./index')
const {connection,db,runQuery}=require('../sqlconn')


router.get('/:userRoute',async(req,res)=>{
    const user_route=req.params.userRoute
    try {
        const data=await runQuery("getUserByUserRoute",{user_route})
        return res.send({"status":"Success",data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to get Profile"})
        
    }
})




  
module.exports = router;