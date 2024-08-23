const express=require('express');
const router = express.Router();
const {postApplication,getallApplications,updateapplicationstatus} = require('../Controller/applicationController.js');
const { isAdminAuthonticated,isUserAuthonticated } = require('../Middlewares/auth.js');


router.post('/postApplication',isUserAuthonticated,postApplication);

router.get('/admin/getallapplications',isAdminAuthonticated,getallApplications);



router.post('/admin/updateapplicationstatus',isAdminAuthonticated,updateapplicationstatus);


module.exports = router;