const router = require('./index')
const {connection,db,runQuery}=require('../sqlconn')


router.post('/getService',async(req,res)=>{
    try {
        const data=await runQuery("getServicesByUserId",{...req.body})
        return res.send({"status":"Success",data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to get Profile"})
    }
})



router.put('/updateService',async(req,res)=>{
    try {
        const data=await runQuery("updateSerivce",{...req.body})

        return res.send({"status":"Success",data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to update Profile"})
    }

})


router.get('/getAvailability',async(req,res)=>{
    try {
        const data=await runQuery("getAvailabilityByUserId",{...req.body})

        return res.send({"status":"Success",data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to get Availability"})
    }

})


router.put('/updateAvailability',async(req,res)=>{
    try {
        const data=await runQuery("updateAvailability",{...req.body})

        return res.send({"status":"Success",data})
    } catch (error) {
        return res.status(400).send({"status":"Failed to update Availability"})
    }

})

  
module.exports = router;